var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.send('HelloWorld');
});
app.listen(1337,'127.0.0.1',function(){
    console.log('Express start at on 127.0.0.1:1337');
});