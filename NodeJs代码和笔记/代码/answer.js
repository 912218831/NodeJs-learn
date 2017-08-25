/**
 * 
 * Node.js 测试代码,应用说明异步思想
 */

 function Person(){
     this.think = function(callback){
         setTimeout(function(){console.log("thinking~~~!");callback()},5000);
     }
     this.answer = function(){
         console.log("I am answering other question");
     }
 }

 var person = new Person();
 person.think(function(){
     console.log("thinking 5 second, get the right answer")
 });
 person.answer();