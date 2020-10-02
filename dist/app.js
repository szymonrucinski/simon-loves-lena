"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processing = require("../build/Release/greet.node");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express_1.default();
const parentDir = process.cwd();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express_1.default.json({
    type: "application/json",
}));
app.use(upload());
app.get("/", (req, res) => {
    res.send("Image Processing web API build by Szymon Rucinski");
});
app.post("/brighter/:howBright", (req, res) => {
    if (req.files) {
        console.log(parentDir + "XDD");
        console.log(req.files);
        console.log(req.body.value);
        var file = req.files.file;
        var fileName = file.name;
        file.mv(parentDir + "/static/upload/" + fileName, (err) => {
            if (err) {
                res.send("ERROR WHILE UPLOADING");
            }
            else {
                processing.modBright(parentDir + "/static/upload/" + fileName, parseInt(req.body.value), fileName);
                res.sendFile(parentDir + "/static/output/" + fileName);
            }
        });
    }
});
app.listen(PORT, () => {
    console.log("Server running on port %d", PORT);
});
