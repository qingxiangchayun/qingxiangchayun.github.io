function Person (name) {
	this.name = name;
}

Person.prototype.showName = function(){
	console.log(this.name);
}

var xm = new Person('xiaoming');

function Student (name,grade){
	Person.call(this,name);
	this.grade = grade;
}


function extend(target,source,deep){
    for(var key in source){
        if(deep && typeof source[key] === 'object'){
            target[key] = extend({},source[key],deep);
        }else{
            target[key] = source[key];
        }
    }
   
    return target;
}

var xh = new Student('xiaohong','college');



