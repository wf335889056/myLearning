function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	console.log(this.name);
};
function son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
son.prototype = new Father();//继承父类方法,第二次调用Father()
son.prototype.sayAge = function(){
	console.log(this.age);
}
var instance1 = new son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance2 = new son("zhai",10);
console.log(instance2.colors);//"red,blue,green"
instance2.sayName();//zhai
instance2.sayAge();//10