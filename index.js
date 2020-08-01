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


  res.send("Image Processing web API build by Szymon Rucinski")
});

app.post('/brighter/:howBright', (req,res)=>{

    if(req.files)
    {
        console.log(req.files);
        console.log(req.body.value);
        var file = req.files.file
        var fileName = file.name

        file.mv('./images/' + fileName, (err)=>{
            if(err)
            { res.send('err')
            }
            else
            {
            processing.modBright(__dirname + "/images/"+fileName, parseInt(req.body.value));
            res.sendFile(__dirname + '/images/new.bmp' );

            }
        })

    }
});


app.listen(PORT, () => {
 console.log('Server running on port %d', PORT);
});