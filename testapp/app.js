const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3002;
const fs = require("fs");
const path = require("path");
const decompress = require("decompress");
var quote;
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lostmypillow.github.io/jquotes-web"
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});


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


app.get("/", async (req, res) => {
  await betterCheck();
  res.json({ data: quote[Math.floor(Math.random() * quote.length)] });
});



app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
