var express = require("express");
var router = express.Router();
const fs = require("fs");
const filePath = "./public/data/data.json";
const inputPath = "/data.zip";
const outputPath = "/data/";
const decompress = require("decompress");
const getRandQuote = require("../lib/getRandQuote");

router.get("/", async function (req, res, next) {
  if (fs.existsSync(filePath)) {
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
