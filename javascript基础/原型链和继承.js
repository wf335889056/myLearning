/* 原型 
 * 每个对象都有__proto__属性, 都指向了它原型对象
 * 它的原型对象也是对象, 也存在了一个原型对象, 形成了原型链
 * 所有的对象实例__proto__都指向了其构造函数的原型对象prototype
 * 所有的函数(构造函数)都是Function的实例, 
 * 所以所有函数__proto__都指向了其Function的原型对象prototype
 * 所有的原型对象(Function对象)都是Object的实例, 
 * 所以所有的原型对象__proto__都指向了其Object的原型对象prototype
 * 所有的Object对象__propotype都指向null
 * 可以通过instanceof来判断该构造函数的prototype的类型
 */

function Fun () {}
var fun = new Fun()
console.log(fun instanceof Fun) // true

// 继承的方式
// 构造函数继承
function Person() {
  this.arr = [1, 2, 3, 4]
}
function Son() {
  Person.call(this)
}

var sun1 = new Son()
sun1.arr.push(5)
console.log(sun1.arr) // [1, 2, 3, 4, 5]

var sun2 = new Son()
sun2.arr.pop()
console.log(sun2.arr) // [1, 2, 3] 

/* 通过以上两个例子, 可以发现通过构造函数继承的引用类型都是独立存储的
 * 但是如果我们想定义一些方法, 只能在构造函数中定义, 缺少复用性, 
 * 还有我们通过new Son方法来继承, 但是我们不知道Person中的属性方法都是未知的
 */

// 原型继承
function create(o) {
  function F() {}
  F.prototype = o // 本质更像是浅复制, 只是都值的复制, 并没有改变值的地址
  return new F
}

var person = {
  arr: [1, 2, 3, 4]
}
var person1 = create(person)
person1.arr.push(5)
var person2 = create(person)
person2.arr.push(6)
console.log(person.arr) [1, 2, 3, 4, 5, 6]
/*
 * 通过原型对象继承, create函数, 创建的类型(引用类型)的属性始终都共享相应的值
 */

// 组合继承
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
son.prototype = new Father();//继承父类方法,第二次调用Father()
son.prototype.sayAge = function(){
	alert(this.age);
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
/*
 * 组合继承避免了原型链和借用构造函数的不足之处, 
 * 可以用instanceof和Object.isPrototypeOf来识别继承创建的对象
 * 但是调用了两次父类的构造函数, 造成不必要的消耗
 */

// 寄生组合继承
function createAnother(original){
	var clone = object(original); // 通过调用object函数创建一个新对象
	clone.sayHi = function(){ // 以某种方式来增强这个对象
		alert("hi");
	};
	return clone; //返回这个对象
}
/*
 * 可以避免父类构造函数的第二次调用, 减少了js性能开销
 */