var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    fs = require('fs');

http.createServer(function(req,res){

    var pathname = url.parse(req.url).pathname;
    switch(pathname){
        case '/add' : resAdd(res,req);
        break;
        default : resDefault(res);
        break;
    }

}).listen(1337,'127.0.0.1');

function resDefault(res){
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    console.log(readPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(indexPage);
}

function resAdd(res,req){
    var postData = '';
    req.setEncoding('utf8');
    req.addListener('data',function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener('end',function(){
        var param = querystring.parse(postData);
        console.log(postData);
        console.log(param);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('success');    
    });
}