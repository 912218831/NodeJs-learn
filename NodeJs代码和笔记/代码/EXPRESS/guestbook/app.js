var http = require('http'),
    path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    app = express();
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyparser.urlencoded({extended:false}));
app.get("/",function(request,response){
    response.render('index');
});
app.get("/new-entry",function(request,response){
    response.render('new-entry');
})
app.post("/new-entry",function(request,response){
    if(!request.body.title || !request.body){
        response.status(400).send("Entries must have a title and a body");
        return;
    }
    entries.push({
        title:request.body.title,
        content:request.body.body,
        published:new Date()
    });
    response.redirect("/");
});
app.use(function(request,response){
    response.status(404).render('404');
});
http.createServer(app).listen(1337,function(){
    console.log("Guestbook app start on port 1337");
});