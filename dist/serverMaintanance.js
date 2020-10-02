"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const clear = (uploadDir, outputDir) => {
    fs_extra_1.default.emptyDirSync(uploadDir);
    fs_extra_1.default.emptyDirSync(outputDir);
};
const makeDir = () => {
    if (!fs_extra_1.default.existsSync("./static/")) {
        fs_extra_1.default.mkdirSync("./static/");
        fs_extra_1.default.mkdirSync("./static/upload");
        fs_extra_1.default.mkdirSync("./static/output");
    }
};
