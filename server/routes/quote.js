var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require('path');

// Path to your ZIP file and the directory where you want to extract
const inputPath = path.join(__dirname, 'data.zip');
const outputPath = path.join(__dirname, 'data');
const decompress = require("decompress");
const getRandQuote = require("../lib/getRandQuote");

router.get("/", async function (req, res, next) {
  if (fs.existsSync(inputPath)) {
    const firstObject = await getRandQuote(filePath);
    res.json(firstObject);
  } else {
    await decompress(inputPath, outputPath)
      .then((files) => {
        console.log("Files decompressed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    const firstObject = await getRandQuote(filePath);
    res.json(firstObject);
  }
});

module.exports = router;
