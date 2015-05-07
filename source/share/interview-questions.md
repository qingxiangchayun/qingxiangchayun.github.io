
# interview-questions

## js编写一个继承的实例
```
function Person (name) {
	this.name = name;
}

Person.prototype.showName = function(){
	console.log(this.name);
}

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

extend(Student.prototype,Person.prototype);

var xm = new Person('xiaoming');
var xh = new Student('xiaohong','college');
```

## 一个页面从输入 URL 到页面加载完的过程中都发生了什么事情


* 输入地址
* 浏览器查找域名的 IP 地址
* 这一步包括 DNS 具体的查找过程，包括：浏览器缓存->系统缓存->路由器缓存...
* 浏览器向 web 服务器发送一个 HTTP 请求
* 服务器的永久重定向响应（从 http://example.com 到 http://www.example.com）
* 浏览器跟踪重定向地址
* 服务器处理请求
* 服务器返回一个 HTTP 响应
* 浏览器显示 HTML
* 浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
* 浏览器发送异步请求

## 谈一下你所知道的页面性能优化方法
* 减少计算
* 降低I/O
* 关注数据监控

## js 排序算法
```
function bubbleSort(arr){
   var len = arr.length;
   for(var i = 0;i<len-1;i++ ){
       for(var j = 0;j < len-1;j++){
           var temp;
           if(arr[j] > arr[j+1]) {
               temp = arr[j];
               arr[j] = arr[j+1];
               arr[j+1] = temp;
             }
        }
    }
  return arr;
}
```

```
function quickSort(items){
   var len = items.length;
   var flag = true;
   for(var i = 0;i<len;i++){
      if(items[i]!=items[0]){
         flag=false;
       }
    }
   if (len == 1 || flag){
      return items;
    };
   var left=[],right=[],pivot = (items[0]+items[1])/2;
   for(var i=0;i<len;i++){
       if(compare(items[i],pivot)){
           right.push(items[i]);
       }else{
           left.push(items[i]);
       }
   }
   return merge(quickSort(left),quickSort(right));
}

function merge(left,right){
    return left.concat(right);
}
function compare(a,b){
    if(a<b) return false;
    else return true;
}
```

## js 内存泄漏
* DOM 对象与 js 对象互相引用 -- 解决方案：jquery 的 data 缓存。
* 定时器第一个参数是字符串
* 
`function bindEvent() 
{ 
    var obj = document.createElement("XXX"); 
    obj.onclick = function(){ 
        // ... 
    } 
}

bindEvent();`

## CommonJS
* javascript not just for browsers any more;
* modules
* i/o
* fs
* system
* worker
* packages
* promises

## CommonJS module
```
// require module
var lib = require('pageage/lib');

// define module
function mod(){ // do somethings}

// export module
export.mod = mod;
```

## AMD
```
define(id,deps,factory);
```

## AMD & CMD 
* 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。RequireJS 从2.0开始，也可以改成延迟执行。
* AMD 推崇依赖前置，CMD 推崇依赖就近。
* AMD 的API默认一个当多个用，CMD 的API严格区分，推崇职责单一。

* http://www.zhihu.com/question/20351507
* https://github.com/seajs/seajs/issues/277

## UMD
UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```

## ECMAScript Harmony
* 使用 module 关键字定义模块
* 使用 import 关键字加载外部模块


## RequireJS


## node



## xss
跨站脚本攻击(Cross Site Scripting)
```
function escape(s) {
  return '<script>console.log("'+s+'");</script>';
}

s = ");alert('xss')

function escape(input) {
    // warm up
    // script should be executed without user interaction
    return '<input type="text" value="' + input + '">';
}

"><svg/onload=prompt(1)>
```

## CSRF
CSRF(Cross-site request forgery)跨站请求伪造

* 验证HTTP Referer字段
* 在请求地址中添加token并验证

## grunt

## jquery 插件扩展模式
```
(function($){
	$.fn.myPluginName = function(){}
})(jQuery);


(function($){
	$.exentd($.fn,{
		myplugin : function(){}
	})
})(jQuery);
```

## 项目中遇到的问题
* 运营商修改服务端返回的数据
* ES指定函数声明只能出现在其他函数或者程序的最外层（JavaScript没有块级作用域）
* window.open是用户行为时，浏览器不会限制。

## 提问
* 您作为领导，看到的在这个职位上做的很出色的员工都有什么特质？
* 公司对我这个职位的期望是什么？
* 为了胜任这个岗位我还需要学习哪些技术知识？
* 个人发展自我驱动，环境影响。
* T7、T8 大牛






