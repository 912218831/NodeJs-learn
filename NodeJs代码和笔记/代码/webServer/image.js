var res,req,
    fs = require('fs'),
    url = require('url');
    exports.init = function(response,request){
        res = response;
        req = request;
    }
    exports.img = function(){
        var readPath = __dirname+ '/'+url.parse('logo.png').pathname;
        var indexPage = fs.readFileSync(readPath);
        res.writeHead(200,{'Content-Type':'image/png'});
        res.end(indexPage);
    }