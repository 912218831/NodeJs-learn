var http = require('http'),
    url = require('url'),
    querystring = require('querystring');
    http.createServer(function(req,res){
        var pathname = url.parse(req.url).pathname;
        var paramstr = url.parse(req.url).query;
        var param = querystring.parse(paramstr);
        if('./favicon.ico' == pathname){
            return;
        }
        console.log(pathname);
        console.log(paramstr ? paramstr : 'no param');
        console.log(param);
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('success');
    }).listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');