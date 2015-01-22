title: jquery data 数据缓存
tags: jQuery
date: 2015-01-11 18:34:03
---

### .data API
`data([key],[value])`/ `data(obj)`
参数：
* key value
* obj (key-value)

** `.data()`方法允许我们在DOM元素上绑定任意类型的数据,避免了循环引用的内存泄漏风险**

### .data Examples
```
$('#div1','foo','test');
$('#div2').data({
	bar : 'test1',
	baz : 'test2'
});

console.log($('#div1','foo') --> test
console.log($('#div2','bar') --> test1

```

### attr VS data
```
var value1 = 'value1';
var value2 = {
	a : 111,
	b : 222
}

$('#div').attr('key1',value1); 
console.log($('#div').attr('key1')) --> value1

$('#div').attr('key2',value2); 
console.log($('#div').attr('key2')) --> "[object Object]"

$('#div').data('key1',value1); 
console.log($('#div').data('key1')) --> value1

$('#div').data('key2',value2); 
console.log($('#div').data('key2')) --> Object { a=111, b=222}

```
![attr vs data](/img/jquery-data-attr.jpg);

### 内存泄漏
DOM元素与JS对象项目引用，大部分的浏览器会引起内存泄漏。


### 源码分析

![jquery-data](/img/jquery-data.png);



###　Object.defineProperty
`Object.defineProperty(object, propertyname, descriptor)`;
将属性添加到对象或修改现有属性的特性。
object
    必需。 对其添加或修改属性的对象。 这可以是本机 JavaScript 对象（即用户定义的对象或内置对象）或 DOM 对象。
propertyname
    必需。 一个包含属性名称的字符串。
descriptor
    必需。 属性的描述符。 它可以针对数据属性或访问器属性

返回值
已修改的对象。
```
var obj = {
  a : 111
}
Object.defineProperty( obj , 'a', {
  value : 222,
  enumerable : true
} );

obj --> Object { a=222}


var obj = {
  a : 111,
  b : 222
};

Object.defineProperty( obj , 'a' , {
  get : function(){
    return {};
  }
} )

obj.a = 123;

obj.a --> Object {}
```




