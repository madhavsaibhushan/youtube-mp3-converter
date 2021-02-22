var express = require("express");
var app = express();
var hbs = require("hbs");
var path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./hbs"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/getInfo", async (req, res) => {
  let url = req.query.url;
  console.log("dwnload called", url);
  const info = await ytdl.getBasicInfo(url).catch((err) => {
    res.json({
      error: err,
    });
    return;
  });
  res.send({
    info: info,
  });
});
app.get("/download", async (req, res) => {
  let url = req.query.url;
  let fileName = req.query.fileNm;
  res.set({
    "Content-Disposition": `attachment; filename=${fileName}.mp3`,
    "Content-Type": "audio/mpeg3",
  });
  ytdl(req.query.url, { filter: "audioonly" })
    .on("progress", (length, download, totallenght) => {})
    .pipe(res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("port is running on", process.env.PORT);
});
