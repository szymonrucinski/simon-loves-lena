import express, { Application, Request, Response } from "express";
const processing = require("../build/Release/greet.node");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const fs = require("fs-extra");

const app: Application = express();
const parentDir: string = process.cwd();
const uploadDir: string = parentDir + "/static/upload/";
const outputDir: string = parentDir + "/static/output/";

const clear = () => {
  fs.emptyDirSync(uploadDir);
  fs.emptyDirSync(outputDir);
};

const creatDirs = () => {
  if (!fs.existsSync("./static/")) {
    fs.mkdirSync("./static/");
    fs.mkdirSync("./static/upload");
    fs.mkdirSync("./static/output");
  }
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  express.json({
    type: "application/json",
  })
);
app.use(upload());

app.get("/", (req: Request, res: Response) => {
  res.send("Image Processing web API build by Szymon Rucinski");
});

app.post("/brighter/:howBright", (req: Request, res: Response) => {
  if (req.files) {
    var file = req.files.file;
    var fileName = file.name;
    clear;
    file.mv(uploadDir + fileName, (err) => {
      if (err) {
        res.send("ERROR WHILE UPLOADING");
      } else {
        processing.modBright(
          parentDir + "/static/upload/" + fileName,
          parseInt(req.body.value),
          fileName
        );
        res.sendFile(outputDir + fileName);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port %d", PORT);
  creatDirs;
});
