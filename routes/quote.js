var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const decompress = require("decompress");
var quote;

async function checkFile() {
  if (!fs.existsSync(path.join(__dirname, "data.json"))) {
    await decompress(require.resolve("./data.zip"), __dirname);
    console.log("decompressed");
  } else if (quote !== null) {
    return
  } 
}

async function betterCheck() {
  do {
    if (!fs.existsSync(path.join(__dirname, "data.json"))) {
      await decompress(require.resolve("./data.zip"), __dirname);
      console.log("decompressed");
    } else {
      quote = JSON.parse(
        fs.readFileSync(require.resolve("./data.json"), {
          encoding: "utf8",
          flag: "r",
        })
      );
      console.log("read file")
    }
  } while (quote === undefined);
}

async function getQuote() {
  return quote[Math.floor(Math.random() * quote.length)];
}

router.get("/", async function (req, res, next) {
  await betterCheck();
  res.json({ data: await getQuote() });
});

module.exports = router;
