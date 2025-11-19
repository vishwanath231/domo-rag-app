import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";

async function scrapeUsingHeadlessSelenium(url) {
  // Configure Chrome in headless mode
  let options = new chrome.Options();
  options.addArguments("--headless=new");  // modern headless mode
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--window-size=1920,1080");

  // Launch browser
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    console.log("Opening:", url);
    await driver.get(url);

    // Wait for DOM to load
    await driver.sleep(3000);

    // Extract full visible text
    const body = await driver.findElement(By.tagName("body"));
    const text = await body.getText();

    // Save to file
    fs.writeFileSync("headless-output.txt", text);

    console.log("✔ Saved as headless-output.txt");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await driver.quit();
  }
}

scrapeUsingHeadlessSelenium("https://developer.domo.com/portal/kspv2orr3oi30-workflows-product-api");
