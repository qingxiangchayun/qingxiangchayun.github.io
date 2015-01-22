title: jquery
date: 2015-01-22 17:13:29
tags:
---

首先来看一下`jquery`是什么？即学习一下`$`。

```
// Define a local copy of jQuery
// 定义一个jQuery副本
jQuery = function( selector, context ) {
	// The jQuery object is actually just the init constructor 'enhanced'
	return new jQuery.fn.init( selector, context, rootjQuery );
}
```
`jQuery`是一个`function`,返回值`new jQuery.fn.init( selector, context, rootjQuery )`
那么`jQuery.fn.init`又是什么呢？
```
jQuery.fn = jQuery.prototype = {
	...
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {},
	...
}
```
`jQuery.fn.init`是一个function，调用时使用`new`，是一个构造函数；`jQuery`将`jQuery.fn.init`的`prototype`指向`jQuery.fn`

```
// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;
```
`jQuery.fn = jQuery.prototype`,

'jQuery --> new jQuery.fn.init --> jQuery.fn.init.prototype.fn'