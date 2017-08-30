var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    BASE_DIR = __dirname;
http.createServer(function(req,res){
    /*获取web 客户端请求路径*/
    var pathname = url.parse(req.url).pathname;
    /*打印客户请求req对象中的URL,method和headers属性*/
    var realPath = BASE_DIR + '/static' + pathname;
    if(pathname == '/favicon.ico'){
        return;
    }
    else if(pathname == '/index' || pathname == '/'){
        goIndex(res);
    }
    else
        {
            dealWithStatic(pathname,realPath,res);
        }
}).listen(1337,'127.0.0.1');

function goIndex(res){
    /*获取当前index.html的路径*/
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(indexPage);
}
function dealWithStatic(pathname,realPath,res){
    fs.exists(realPath,function(exists){
        //判断文件是否存在
        if(!exists){
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end('hello world');
        }
        else
            {
                var mmieString = path.extname(pathname) ? path.extname(pathname).slice(1):'',
                    mmineType;
                    console.log(mmieString);
                switch(mmieString){
                    case 'css' : 
                    {
                        mmineType = 'text/css';
                    }
                    break;
                    case 'png' : mmineType = 'image/png';
                    break;
                    default :
                    mmineType = 'text/plain';
                    break;
                }
                fs.readFile(realPath,'binary',function(err,file){
                    if(err){
                        res.writeHead(500,{'Content-Type':'text/plain'});
                        res.end(err);
                    }
                    else{
                        res.writeHead(200,{'Content-Type':mmineType});
                        res.write(file,'binary');
                        res.end();
                    }
                })
            }
    })
}
function resImage(res){
    var readPath = __dirname + '/' + url.parse('logo.png').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.writeHead(200,{'Content-Type':'image/png'});
    res.end(indexPage);
}

function resDefault(res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('can not find source');
}