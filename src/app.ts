import express, { Application, Request, Response } from "express";
const improc = require("../build/Release/improc.node");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const fs = require("fs-extra");
import { clear, makeDir } from "./serverOps";

const app: Application = express();
const uploadDir: string = process.cwd() + "/static/upload/";
const outputDir: string = process.cwd() + "/static/output/";

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
    clear(uploadDir, outputDir);
    file.mv(uploadDir + fileName, (err) => {
      if (err) {
        res.send("ERROR WHILE UPLOADING");
      } else {
        improc.brightness(
          uploadDir + fileName,
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
  makeDir();
});
