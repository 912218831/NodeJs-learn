var Person = require('./person');
var Student = require('./student');
var Static_student = require('./static_student');
var personObj = new Person();
var studentObj = new Student();
personObj.sleep();
personObj.eat();

console.log('----------------');
studentObj.sleep();
studentObj.eat();
studentObj.study();

console.log('----------------');
Static_student.sleep();
Static_student.eat();
Static_student.study();