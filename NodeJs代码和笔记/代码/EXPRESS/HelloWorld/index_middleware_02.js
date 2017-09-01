var express = require('express');
var http = require('http');
var app = express();
app.use(function(req,res,next){
    console.log("In comes a " + req.method + " to " + req.query);
    next();
});

app.use(function(req,res,next){
    var minute = (new Date()).getMinutes();
    if( (minute % 2) === 0){
        res.statusCode = 403;
        res.end("Not authorized.");
    }
    else{
        next();
    }
});

app.use(function(req,res){
    res.end('Secret info: the password is "swordfish"');
});
http.createServer(app).listen(1337,'127.0.0.1');