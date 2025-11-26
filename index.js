import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import TurndownService from "turndown";
import { JSDOM } from "jsdom";
import prettier from "prettier";

const SCRAPE_URL = "https://developer.domo.com/portal/umqbnyej9jn06-data-science-webinars";

// =======================================================================
// MAIN SCRAPER FUNCTION
// =======================================================================

async function scrapeAPIContent(url) {
  const driver = await launchBrowser();

  try {
    console.log("Opening:", url);
    await driver.get(url);
    await driver.sleep(3000);

    const rawHTML = await extractHTML(driver);
    const cleanedHTML = cleanHTML(rawHTML);
    const markdown = convertToMarkdown(cleanedHTML, url);
    const enhancedMarkdown = await enhanceMarkdown(markdown);

    saveOutput(enhancedMarkdown);

    console.log("✔ Saved final enhanced markdown: headless-clean-api.md");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await driver.quit();
  }
}

// =======================================================================
// BROWSER SETUP
// =======================================================================

async function launchBrowser() {
  const options = new chrome.Options()
    .addArguments("--headless=new")
    .addArguments("--disable-gpu")
    .addArguments("--no-sandbox")
    .addArguments("--disable-dev-shm-usage")
    .addArguments("--window-size=1920,1080");

  return await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}

// =======================================================================
// HTML EXTRACTION + CLEANING
// =======================================================================

async function extractHTML(driver) {
  return await driver.findElement(By.tagName("html")).getAttribute("innerHTML");
}

function cleanHTML(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  removeNoise(document);
  return extractAPISection(document);
}

function removeNoise(document) {
  const removeSelectors = [
    "header",
    "footer",
    "nav",
    ".sidebar",
    ".menu",
    ".navbar",
    ".cookie",
    ".alert",
    ".hidden",
    ".overlay",
    ".modal",
    "script",
    "style",
  ];

  removeSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
}

function extractAPISection(document) {
  const selectors = [
    "[data-testid='api-section']",
    ".api",
    ".endpoint",
    ".method",
    ".code-snippet",
    ".swagger-section",
    "main",
  ];

  let apiHTML = "";

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      apiHTML += el.outerHTML + "\n";
    });
  });

  return apiHTML.trim() ? apiHTML : document.body.innerHTML;
}

// =======================================================================
// MARKDOWN CONVERSION (WITH CLICKABLE LINKS)
// =======================================================================

function convertToMarkdown(html, currentUrl) {
  const baseUrl = new URL(currentUrl).origin;

  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  turndown.addRule("preserveLinks", {
    filter: "a",
    replacement: function (content, node) {
      let href = node.getAttribute("href") || "";
      if (!href || href.startsWith("javascript:")) return content;

      if (href.startsWith("/")) href = baseUrl + href;

      return `[${content}](${href})`;
    },
  });

  return turndown.turndown(html);
}

// =======================================================================
// MARKDOWN POST-PROCESSING PIPELINE
// =======================================================================

async function enhanceMarkdown(md) {
  let updated = md;

  updated = injectSourceLink(updated);
  updated = removeDuplicateLines(updated);
  updated = mergeBrokenCodeBlocks(updated);
  updated = addTableOfContents(updated);
  updated = await formatMarkdown(updated);

  return updated;
}

// ----- Inject scraped URL into content under first heading -----
function injectSourceLink(md) {
  const lines = md.split("\n");
  const idx = lines.findIndex((line) => line.startsWith("#"));

  if (idx !== -1) {
    lines.splice(
      idx + 1,
      0,
      `> **Source:** ${SCRAPE_URL}`,
      ""
    );
  }

  return lines.join("\n");
}

// ----- Remove duplicate lines -----
function removeDuplicateLines(md) {
  return md
    .split("\n")
    .filter((line, i, arr) => line.trim() !== "" && arr.indexOf(line) === i)
    .join("\n");
}

// ----- Fix broken code blocks -----
function mergeBrokenCodeBlocks(md) {
  const lines = md.split("\n");
  const merged = [];
  let inside = false;

  for (let line of lines) {
    if (line.startsWith("```")) {
      inside = !inside;
      merged.push(line);
      continue;
    }
    if (inside && line.trim() === "") continue;
    merged.push(line);
  }

  return merged.join("\n");
}

// ----- Generate TOC -----
function addTableOfContents(md) {
  const lines = md.split("\n");

  const tocEntries = lines
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, "");
      const link = text.toLowerCase().replace(/[^\w]+/g, "-");

      return `${"  ".repeat(level - 1)}- [${text}](#${link})`;
    });

  if (!tocEntries.length) return md;

  return `## Table of Contents\n\n${tocEntries.join("\n")}\n\n${md}`;
}

// ----- Prettier -----
async function formatMarkdown(md) {
  return await prettier.format(md, { parser: "markdown" });
}

// =======================================================================
// SAVE OUTPUT
// =======================================================================

function saveOutput(content) {
  fs.writeFileSync("headless-clean-api.md", content);
}

// =======================================================================
// RUN SCRAPER
// =======================================================================

scrapeAPIContent(SCRAPE_URL);
