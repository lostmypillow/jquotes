const compression = require('compression')
const express = require("express");
const app = express();
const port = 3002;
const fs = require("fs");
app.use(compression())
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lostmypillow.github.io/"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

app.get("/", async (req, res) => {
  // await betterCheck();
  let path =
    "./split_data_part" +
    (Math.floor(Math.random() * 6) + 1).toString() +
    ".json";
  let quote = JSON.parse(
    fs.readFileSync(require.resolve(path), {
      encoding: "utf8",
      flag: "r",
    })
  );
  res.json(quote[Math.floor(Math.random() * quote.length)]);
});

app.get("/wake", async (req, res) => {
  res.send("system online");
});

app.listen(port, () => {
  console.log(`JQuotes listening on port 3002`);
});
