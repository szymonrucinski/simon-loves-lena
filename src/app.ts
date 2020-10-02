import express, { Application, Request, Response } from "express";
const processing = require("../build/Release/greet.node");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const fs = require("fs");

const app: Application = express();
const parentDir: string = process.cwd();

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
    console.log(parentDir + "XDD");
    console.log(req.files);
    console.log(req.body.value);
    var file = req.files.file;
    var fileName = file.name;
    file.mv(parentDir + "/static/upload/" + fileName, (err) => {
      if (err) {
        res.send("ERROR WHILE UPLOADING");
      } else {
        processing.modBright(
          parentDir + "/static/upload/" + fileName,
          parseInt(req.body.value),
          fileName
        );
        res.sendFile(parentDir + "/static/output/" + fileName);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port %d", PORT);

  if (!fs.existsSync("./static/")) {
    fs.mkdirSync("./static/");
    fs.mkdirSync("./static/upload");
    fs.mkdirSync("./static/output");
  }
});
