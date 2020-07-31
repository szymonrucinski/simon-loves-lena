var processing = require('./build/Release/greet.node');
const fileName = "bartSimpson.jpg"
processing.modBright(__dirname + '/images/'+fileName, 200);
