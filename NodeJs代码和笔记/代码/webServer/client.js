var http = require('http'),
    url = require('url'),
    querystring = require('querystring');
    /**
     * 创建web服务器
     */

     http.createServer(function(req,res){
         var pathname = url.parse(req.url).pathname;
         if(pathname == '/favion.ico'){//过滤浏览器默认请求/favicon.ico
             return;
         }
         //根据用户请求的url路径,截取其中的Module和controller
         var module = pathname.substr(1),
             str = url.parse(req.url).query,
             controller = querystring.parse(str).c,
             classObj = '';
             try{
                classObj = require('./'+module);
             }catch(err){
                console.log('chdir'+err);
             }
             if(classObj){
                 classObj.init(res,req);
                 classObj[controller].call();
             }
             else{
                 res.writeHead(404,{'Content-Type':'text/plain'});
                 res.end('can not find source');
             }
    }).listen(1337,'127.0.0.1');