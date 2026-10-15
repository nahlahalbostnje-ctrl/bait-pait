import fs from "fs";
import path from "path";

const xmlPath = path.join(process.env.TEMP, "bait-guide3", "u", "word", "document.xml");
const xml = fs.readFileSync(xmlPath, "utf8");
let text = xml.replace(/<\/w:p>/g, "\n");
text = text.replace(/<[^>]+>/g, "");
text = text
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"');
text = text.replace(/\n{3,}/g, "\n\n");
fs.writeFileSync(path.join(process.cwd(), "guide-extracted.txt"), text, "utf8");
console.log(text);
console.log("\n---MEDIA---");
const media = path.join(process.env.TEMP, "bait-guide3", "u", "word", "media");
if (fs.existsSync(media)) console.log(fs.readdirSync(media));
else console.log("no media");
