var processing = require('./build/Release/greet.node');
const fs = require('fs');
const mime = require('mime');
const cp  = require('child_process');
const express = require('express');
const path = require('path')
const upload = require('express-fileupload')
const bodyParser = require('body-parser');
const e = require('express');
const jsonParser = bodyParser.json()
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('images'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.json({
    type: 'application/json',
  }));
app.use(upload());


app.get('/', (req, res) => {

   res.sendFile(__dirname + '/index.html' );
 
});

const uploadImage = async(req,res,next)=>{

    var matches = req.body.base64Image.match(/^data:([A-Za-z+\/]+);base64,(.+)$/);
    let response = {};
    if(matches.length!==3)
    {
        return new Error('invalid input string')
    }

    response.type = matches[1];
response.data = new Buffer(matches[2], 'base64');
let decodedImg = response;
let imageBuffer = decodedImg.data;
let type = decodedImg.type;
let extension = mime.extension(type);
let fileName = "image." + extension;
try {
fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
return res.send({"status":"success"});
} catch (e) {
next(e);
}
}

app.post('/', (req,res)=>{

    if(req.files)
    {
        console.log(req.files)
        var file = req.files.file
        var fileName = file.name

        file.mv('./images/' + fileName, (err)=>{
            if(err)
            { res.send('err')
            }
            else
            {
            processing.modBright(__dirname + '/images/'+fileName, 200);
            res.sendFile(__dirname + '/images/new.jpg');
            }
        })

    }
});


app.listen(PORT, () => {
 console.log('Server running on port %d', PORT);
});