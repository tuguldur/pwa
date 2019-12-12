const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const publicKey =
  "BFIH5SfZ3jPEq6RRO0x0ubsg6ncFZrRGp4qlWt9cnSQtqWa3ImxDrd3CPkiGemnOrBHco-SIF5dSlFxd3OMUink";

const privateKey = "zZ7ekogAMxtiYS-bN1FM4g5428WkZNfdHLSvnHweebE";
webpush.setVapidDetails("mailto:tuguldur@nothink.tech", publicKey, privateKey);
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Just pushing Notification" });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err));
});
https
  .createServer(
    {
      key: fs.readFileSync("./fullchain.pem"),
      cert: fs.readFileSync("./cert.pem")
    },
    app
  )
  .listen(443);
