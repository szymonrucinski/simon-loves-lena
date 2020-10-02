"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDir = exports.clear = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const clear = (uploadDir, outputDir) => {
    fs_extra_1.default.emptyDirSync(uploadDir);
    fs_extra_1.default.emptyDirSync(outputDir);
};
exports.clear = clear;
const makeDir = () => {
    if (!fs_extra_1.default.existsSync("./static/")) {
        fs_extra_1.default.mkdirSync("./static/");
        fs_extra_1.default.mkdirSync("./static/upload");
        fs_extra_1.default.mkdirSync("./static/output");
    }
};
exports.makeDir = makeDir;
