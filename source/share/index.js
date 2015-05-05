function Person (name) {
	this.name = name;
}

Person.prototype.showName = function(){
	console.log(this.name);
}

var xm = new Person('xiaoming');


