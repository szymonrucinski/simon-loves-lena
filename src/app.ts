import express, { Application, Request, Response } from "express";
import { improc } from "./improc";
import bodyParser from "body-parser";
import upload from "express-fileupload";
import { clear, makeDir } from "./serverOps";
import { messages } from "./messages";

const PORT = process.env.PORT || 3000;
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
  res.send(messages["greeting"]);
});

app.post("/brighter/:howBright", (req: Request, res: Response) => {
  if (req.files) {
    const file = req.files.file;
    const fileName = file.name;
    clear(uploadDir, outputDir);
    file.mv(uploadDir + fileName, (err) => {
      if (err) {
        res.send(messages["uploadError"]);
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

export { app };
