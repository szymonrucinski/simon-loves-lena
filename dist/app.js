"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const improc_1 = require("./improc");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const serverOps_1 = require("./serverOps");
const messages_1 = require("./messages");
const PORT = process.env.PORT || 3000;
const app = express_1.default();
const uploadDir = process.cwd() + "/static/upload/";
const outputDir = process.cwd() + "/static/output/";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json({
    type: "application/json",
}));
app.use(express_fileupload_1.default());
app.get("/", (req, res) => {
    res.send(messages_1.messages["uploadError"]);
});
app.post("/brighter/:howBright", (req, res) => {
    if (req.files) {
        var file = req.files.file;
        var fileName = file.name;
        serverOps_1.clear(uploadDir, outputDir);
        file.mv(uploadDir + fileName, (err) => {
            if (err) {
                res.send(messages_1.messages["greeting"]);
            }
            else {
                improc_1.improc.brightness(uploadDir + fileName, parseInt(req.body.value), fileName);
                res.sendFile(outputDir + fileName);
            }
        });
    }
});
app.listen(PORT, () => {
    console.log("Server running on port %d", PORT);
    serverOps_1.makeDir();
});
