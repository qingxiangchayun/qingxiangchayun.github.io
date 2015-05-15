
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
  * reflow、repaint、css表达式、避免空的src
* 降低I/O
  * 请求数量：合并脚本和样式表，css Sprites、
  * 缓存利用：CDN、添加 Expires 头，减少DNS查找，配置Etag
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
* DOM 对象与 js 对象互相引用(循环引用)
  * 问题：IE9之前的版本因为对JScript对象和COM对象使用不同的垃圾收集机制 
  * 解决方案：取消循环引用，如jquery 的 data 缓存。
* 定时器第一个参数是字符串
* 内存泄漏的一个示例
```function bindEvent() 
{ 
    var obj = document.createElement("XXX"); 
    obj.onclick = function(){ 
        // ... 
    } 
}

bindEvent();
```

## 跨域
* jsonp
* iframe
  * document.domain 跨子域 两个页面的document.domain都指向主域,父页面通过ifr.contentWindow就可以访问子页面的window，子页面通过parent.window或parent访问父页面的window
  * window.name
  * location.hash
* img ping
* WebSocket 

* CORS(Cross-Origin Resource Sharing) 跨域资源共享
  * 标准浏览器`XMLHttpRequest` IE `XDomainRequest` 
  * (Cross-Origin Resource Sharing) 这个特性的出现使得跨域通信只需通过配置http协议头来即可解决。Access-Control-Allow-Origin:http://a.com表示允许a.com下的域名跨域访问
* HTML5 postMessage 跨文档消息通信 `window.postMessage(message, targetOrigin, [transfer])` 
  * 交互方式 
    * iframe 父页面 :  contentWindow、子页面 :  window.top
    * 窗口页 :  父页面 :  window.open、子页面 : window.opener
  * 接受事件
    * message
    * ev.origin 发送数据来源的域
    * ev.data 发送的数据

* 解决方案 [alloyteam messengerJS](http://www.alloyteam.com/2013/11/the-second-version-universal-solution-iframe-cross-domain-communication/)
  * postMessage
  * IE6/7 navigator对象在父窗口和iframe之间是共享的,可以在父窗口中，在navigator对象上注册一个消息回调函数；在iframe中，调用navigator上的这个函数并传入参数

## iframe
* 操作iframe
  * iframe.contentWindow iframe的window对象
  * iframe.contentDocument iframe的document对象 ie6、7 不支持
* 操作iframe的父级
  * window.parent.document iframe的父级页面
  * window.top 最顶层
* 相关注意点
  * ie 下iframe的onload需通过事件绑定的形式
  * chrome 需以服务器的形式操作iframe

## ajax
* 创建xhr对象
  * `new XMLHttpRequest() / ActiveXObject('Microsoft.XMLHTTP')`
* 建立连接
  * `xhr.open(method,url,true) `
  * `method == get ? url += '?' + data : url`
* 发送数据 
  * `method == get ? xhr.send() : xhr.send(data); xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')`
* 接受数据
  * `xhr.onreadystatechange`
  * `xhr.readyState ` 
    * 0: 请求未初始化 
    * 1: 服务器连接已建立
    * 2: 请求已接收
    * 3: 请求处理中
    * 4: 请求已完成，且响应已就绪
  * `xhr.status == 200 || xhr.status == 303`
* 处理数据
  * `xhr.responseText`

## Fetch
* 使用fetch的原因
  * `XMLHttpRequest` 设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里
  * `XMLHttpRequest` 基于事件的模型与最近JavaScript流行的Promise以及基于生成器的异步编程模型不太搭
* Fetch Interfaces 
  * GlobalFetch 
    * Contains the fetch() method used to fetch a resource.
  * Headers
    * Represents response/request headers, allowing you to query them and take different actions depending on the results.
  * Request
    * Represents a resource request.
  * Response
    * Represents the response to a request.
  
## HTTP
* 请求头包含请求的方法、URL、协议版本、以及包含请求修饰符、客户信息和内容的类似于MIME的消息结构
* 服务器以一个状态行作为响应，响应的内容包括消息协议的版本，成功或者错误编码加上包含服务器信息、实体元信息以及可能的实体内容

* HTTP的头域包括通用头，请求头，响应头和实体头四个部分
* 通用头域
  * Cache-Control 指定请求和响应遵循的缓存机制。
    * 请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、only-if-cached
    * 响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age
      * max-age 指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应 HTTP1.1

  * Date头域
    * Date头域表示消息发送的时间，时间的描述格式由rfc822定义。例如，Date:Mon,31Dec200104:25:57GMT。

  * Pragma头域
    * Pragma头域用来包含实现特定的指令，最常用的是Pragma:no-cache。在HTTP/1.1协议中，它的含义和Cache-Control:no-cache相同。

* Request Headers
  * Host 头域 
    * Host头域指定请求资源的Intenet主机和端口号，必须表示请求url的原始服务器或网关的位置。HTTP/1.1请求必须包含主机头域，否则系统会以400状态码返回
  * Referer头域
    * Referer头域允许客户端指定请求uri的源资源地址，这可以允许服务器生成回退链表，可用来登陆、优化cache等
  * User-Agent头域
    * User-Agent头域的内容包含发出请求的用户信息

```
Accept:text/css,*/*;q=0.1
Accept-Encoding:gzip, deflate, sdch
Accept-Language:zh-CN,zh;q=0.8
Cache-Control:max-age=0
Expires:Thu, 08 May 2025 02:23:22 GMT
Connection:keep-alive
Host:mozorg.cdn.mozilla.net
If-Modified-Since:Thu, 07 May 2015 21:48:22 GMT
Referer:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36
```

* Request Headers
```
Cache-Control:max-age=315360000
Connection:keep-alive
Content-Encoding:gzip
Content-Type:text/css
Date:Fri, 08 May 2015 09:51:30 GMT
Expires:Mon, 05 May 2025 09:51:30 GMT
Last-Modified:Thu, 26 Mar 2015 04:57:50 GMT
Server:nginx/1.6.0
Transfer-Encoding:chunked
Vary:Accept-Encoding
```

## HTTP status 304
* Etag (entity tag) 是万维网协议HTTP的一部分。ETag是HTTP协议提供的若干机制中的一种Web缓存验证机制，并且允许客户端进行缓存协商。
  * ETag在HTTP头字段中的使用是可选的。
  * HTTP规范从未指定生成ETag的方法。
  * 用法
    * 当一个URL被请求，Web服务器会返回资源和其相应的ETag值，它会被放置在HTTP的“ETag”字段中：`ETag: "686897696a7c876b7e"`
    * 然后，客户端可以决定是否缓存这个资源和它的ETag。以后，如果客户端想再次请求相同的URL，将会发送一个包含已保存的ETag和“If-None-Match”字段的请求。`If-None-Match: "686897696a7c876b7e"`
    * 客户端请求之后，服务器比较客户端的ETag和当前版本资源的ETag。

* Response Headers
  * Last-Modified : Wed, 14 Jan 2015 22:37:09 GMT
* Request Headers
  * If-Modified-Since : Wed, 14 Jan 2015 22:37:09 GMT

* Cache-Control
  * Cache-Control:max-age=xxx max-age:秒，距第一次访问多少秒后再次访问则认为缓存有效

* Last-Modified 只能精确到秒级别,如果要到毫秒级别，就要用ETag.

## Expires 与 max-age 区别
* Expires在HTTP/1.0中已经定义，Cache-Control:max-age在HTTP/1.1中才有定义，为了向下兼容，仅使用max-age不够；
* Expires指定一个绝对的过期时间(GMT格式),这么做会导致至少2个问题：
  * 客户端和服务器时间不同步导致Expires的配置出现问题。 
  * 很容易在配置后忘记具体的过期时间，导致过期来临出现浪涌现象；
* max-age 指定的是从文档被访问后的存活时间，这个时间是个相对值(比如:3600s),相对的是文档第一次被请求时服务器记录的Request_time(请求时间)
* Expires指定的时间可以是相对文件的最后访问时间(Atime)或者修改时间(MTime),而max-age相对对的是文档的请求时间(Atime)

## 200 from cache
* 不需要发送请求，直接使用浏览器缓存
* 直接点击链接或输入url enter方法

## ie 各版本和chrome可以并行下载多少个资源
* IE6 两个并发，iE7升级之后的6个并发，之后版本也是6个
* Firefox，chrome也是6个






## CommonJS
* javascript not just for browsers any more;
* modules
* i/o
* fs system
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

## DOM 
* 可视区尺寸 document.documentElement.clientWidth/clientHeight
* 滚动距离 document.body.scrollTop || document.documentElement.scrollTop
* 文档高度 document.body.offsetHeight


## RequireJS


## node

## AMD 模版加载器
* id即路径
* createElement('script') && appendChild
* document.currentScript / script.onload
* 依赖分析
* 递归加载





## xss
* 概念
  * 跨站脚本攻击(Cross Site Scripting)
* 原理
  * 用户输入的内容，本应该作为data数据展示的，却被当作指令来执行。
  * 对于服务器端来说，html是数据（字符串）；对于浏览器端来说，html是指令。XSS的原理，就是破坏html/css/js的构造
* 分类
  * 反射型：输入--输出；
    * dom-xss
  * 存储型：输入--进入数据库--取出数据库--输出。
* 解决方法
  * 正确escape
  * innerHTML --> Template

```
function escape(s) {
  return '<script>console.log("'+s+'");</script>';
}

s == ");alert('xss')

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

## 生成一个1-100的数组，然后将数组顺序打乱
```
var arr = [];
for(var i=1; i<101; i++){
  arr.push(i);
}

arr.sort(function(){
  return Math.rondom() - 0.5;
});
```

## this
```
<a id="J_link" href="javascript:alert(this)" onclick="javascript:alert(this)"> A Link </a>
```
* onclick 
  * this 指向 a 标签
  * alert 的内容是 href 的属性值 `javascript:alert(this)` 
    * alert 方法执行结果必须是字符串
    * `document.getElementById('J_link').toString()` --> href的属性值
  * console.log(this) 的内容是 ` <a onclick="javascript:console.log(this);" href="javascript:alert(this);">` 控制台中点击，可以找到对应的DOM节点

* onclick 中的 javascript
  * onclick 的属性值，本来就会被当作脚本对待，不存在指明协议的需求。添加 javascript 是为了区别 vbscript
  * 在 onclick 等属性解析的时候，其属性值被引擎打包在一个匿名函数中
  ```
  <a id="J_link"> A Link </a>
  <script>
    document.getElementById('J_link').onclick = function(){
      // code 
    }
  </script>
  ```

* href
  * this 指向 window
  * alert 的内容是 `[object Window]`

* href 中的 javascript
  * href 属性中， javascript: 是协议名，与 http: 类似，它告诉浏览器，后面的内容是一段 javascript 脚本
  * 当此链接被点击的时候，浏览器实际上执行的是一个 navigate 的动作，只是 navigate 的目标，不是常见的 http:，而是 javascript:
  * href 后的代码，其 执行环境 是 全局

* 先执行 onclick 事件，在执行 href 跳转。

* `<div onclick="javascript:alert(this)"> Div Tag </div>` alert 内容 `[object HTMLDivElement]`
* `<h1 onclick="javascript:alert(this)"> H1 Tag </h1>` alert 内容 `[object HTMLHeadingElement]`


## HTML && DOM 
* HTML -- Hyper Text Markup Language 超文本标记语言

* DOM -- Document Object Model 文档对象模型
  * DOM 定义了访问 HTML 和 XML 文档的标准 
  > W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。

* HTML DOM
  * HTML DOM 是关于如何获取、修改、添加或删除 HTML 元素的标准


## 屏蔽广告
* 找到对应的广告id、class，remove或display:none

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






