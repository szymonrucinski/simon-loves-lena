import fs from "fs-extra";

const clear = (uploadDir: string, outputDir: string): void => {
  fs.emptyDirSync(uploadDir);
  fs.emptyDirSync(outputDir);
};

const makeDir = (): void => {
  if (!fs.existsSync("./static/")) {
    fs.mkdirSync("./static/");
    fs.mkdirSync("./static/upload");
    fs.mkdirSync("./static/output");
  }
};

export { clear, makeDir };
