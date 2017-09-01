var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    express = require('express'),
    logger = require('morgan'),
    app = express();
app.use(logger("short"));
// app.use(function(req,res,next){
//     var filePath = path.join(__dirname,"static",req.url);
//     fs.stat(filePath,function(err,fileInfo){
//         if(err){
//             next();
//             return;
//         }
//         if(fileInfo.isFile()){
//             res.sendFile(filePath);
//         }else {
//             next();
//         }
//     });
// });
var staticPath = path.join(__dirname,"static");
app.use(express.static(staticPath));
app.use(function(req,res){
    res.status(404);
    res.send("File not found");
});

http.createServer(app).listen(1337,function(){
    console.log("App started on port 1337");
});
