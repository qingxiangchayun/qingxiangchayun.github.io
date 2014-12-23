title: jquery中的正则
tags: jQuery
date: 2014-12-22 14:46:49
---

最近在学习jquery源码，分析jquery的实现原理，但由于jquery代码比较多，方法之间耦合性很强，要学习一个方法得了解很多其他相关的方法，这些方法中还充斥中不少正则，所以本文会把jquery中用到的正则都抽出来，单独写一篇文章来介绍jquery中的正则。

## RegExp

### 语法
* /pattern/attributes
* new RegExp(pattern, attributes);

### 符号
* (?:pattern) : 匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。
* \s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \f\n\r\t\v]。
* \w 匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。
* .点 匹配除“\r\n”之外的任何单个字符。要匹配包括“\r\n”在内的任何字符，请使用像“[\s\S]”的模式。
* \num 匹配num，其中num是一个正整数。对所获取的匹配的引用。例如，“(.)\1”匹配两个连续的相同字符。
* | 将两个匹配条件进行逻辑“或”（Or）运算。例如正则表达式(him|her) 匹配"it belongs to him"和"it belongs to her"，但是不能匹配"it belongs to them."。

### RegExp 对象方法
* exec() 方法用于检索字符串中的正则表达式的匹配
* test() 方法用于检测一个字符串是否匹配某个模式

### 支持正则表达式的 String 对象的方法
* search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
* match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
* replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
* split() 方法用于把一个字符串分割成字符串数组 **tips:stringObject.split(separator,howmany) howmany可选。该参数可指定返回的数组的最大长度**

## jQuery RegExp 

### rquickExpr
```javascript
// A simple way to check for HTML strings
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
```
匹配 < tags > 或 #id 用法：

```javascript
var html = '<div class="className" id="idName"> content </div>';
var html1 = '#ids';
rquickExpr.exec(html); 
log --> ["<div class="className" id="idName"> content </div>", "<div class="className" id="idName"> content </div>", undefined]
rquickExpr.exec(html1); 
log --> ["#ids", undefined, "ids"]
```

![rquickExpr](/img/jquery-rquickExpr.png);

### rsingleTag
```javascript
// Match a standalone tag
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
```

匹配单标签
```javascript
var html = '<div class="className"></div>';
var html1 = '<div> content </div>';
var html2 = '<div> content </div>';
var html3 = '<img>';
var html3 = '<img/>';
rsingleTag.exec(html); --> null
rsingleTag.exec(html1); --> null
rsingleTag.exec(html2); --> ["<div></div>", "div"]
rsingleTag.exec(html3); --> ["<img>", "img"]
rsingleTag.exec(html4); --> ["<img/>", "img"]
```
![rsingleTag](/img/jquery-rsingleTag.png);

## JavaScript Regular Expression Visualize
推荐使用正则可视化分析工具 
* [http://jex.im/regulex/](http://jex.im/regulex) 
* github:[https://github.com/JexCheng/regulex](https://github.com/JexCheng/regulex)
* [https://www.debuggex.com/](https://www.debuggex.com/)
