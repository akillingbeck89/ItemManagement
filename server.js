var express = require("express"),
app = express(),
port = process.env.PORT || 3000,
websocketPort = process.env.PORT + 1  || 3001,
bodyParser = require('body-parser');

var routing = require('./router/ItemManagerRouter');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


routing(app);



app.listen(port);



console.log("Listening on port " + port);
