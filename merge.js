import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = __dirname; 
const outputFile = path.join(folderPath, "merged.txt");

// Read all files in folder
const files = fs.readdirSync(folderPath);

// Filter only pageX.txt files
const pageFiles = files
  .filter((file) => /^page\d+\.txt$/.test(file))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

console.log("Files in order:", pageFiles);

// Merge files
let mergedContent = "";

pageFiles.forEach((file) => {
  const filePath = path.join(folderPath, file);
  const content = fs.readFileSync(filePath, "utf8");
  mergedContent += content + "\n\n";
});

// Write merged output
fs.writeFileSync(outputFile, mergedContent);

console.log("Merged successfully → merged.txt");
