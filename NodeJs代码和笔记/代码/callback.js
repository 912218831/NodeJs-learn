/**
 * callback.js Node.js 事例代码,说明非异步接口调用的Node.js代码,
 * 执行过程同样是同步的
 */

 function waitFive(name,function_name){
     var pus = 0;
     var currentDate = new Date();
     while(pus < 5000){
         //等待5秒
         var now = new Date();
         pus = now - currentDate;
     }
     function_name(name);//执行回调函数
 }

 function echo(name){
    //定义回调函数echo()
    console.log(name);
 }
 waitFive("danhuang",echo);//调用waitFive方法
 console.log("its over");