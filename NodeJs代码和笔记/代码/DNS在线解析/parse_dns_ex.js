/**
 * 首先require 加载需要的Node.js 原生模块
 */

 var http = require('http'),//DNS 服务器创建
     dns = require('dns'), // DNS 查询
     fs = require('fs'),  //文件操作
     url = require('url'), //url处理
     querystring = require('querystring'); //字符串处理
http.createServer(function(req,res){

    // /* 写http head 返回html, 因此 Content-Type 为html */
    // res.writeHead(200,{'Content-Type':'text/html'});
    // /**获取当前index.html的路径 */
    // var readPath = __dirname+'/'+url.parse('index.html').pathname;
    // var indexPage = fs.readFileSync(readPath);
    // /* 返回*/
    // res.end(indexPage);


    //路由
    /** 写http head 返回html,因此Content-Type为html */
    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    res.writeHead(200,{"Content-Type":"text/html"});
    router(res,req,pathname);
}).listen(3000,"127.0.0.1");

function router(res,req,pathname){
    switch(pathname){
        case "/parse":
            parseDns(res,req)
        break;
        default:
            goIndex(res,req)
    }
}

function goIndex(res,req){
    /* 获取 index.html*/
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    /** 同步读取index.html 文件的信息 */
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);
}

function parseDns(res,req){
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData = postDataChunk;
    });

    /** HTTP 相应html页面信息 */
    req.addListener("end",function(){
        var retData = getDns(postData,function(domain,addresses){
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end("<html><head><meta http-equiv='content-type' content='text/html; charset=utf-8'/></head><div style='text-align:center'> Domain:<span style='color:red'>"+"</span> IP:<span style='color:red'>"+addresses.join(',')+"</span> </div></html>");
        });
        return;
    });
}
function getDns(postData,callback){
    var domain = querystring.parse(postData).search_dns;
    dns.resolve(domain,function(err,addresses){
        if(!addresses){
            addresses = ["不存在域名"];
        }
        callback(domain,addresses);
    });
}