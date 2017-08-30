var util = require('util');
var Person = require('./person');
class Student {
    constructor() {
        Person.call(this);
        util.inherits(Student, Person);
        this.study = function() {
            console.log('study~~~');
        };
    }
}
var person = new Student();
exports.study = person.study;
exports.eat = person.eat;
exports.sleep = person.sleep;
