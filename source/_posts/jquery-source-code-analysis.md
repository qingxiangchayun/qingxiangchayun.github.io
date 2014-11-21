title: jquery source code analysis
date: 2014-10-20 14:36:27
tags: jQuery
---

## jquery 源码学习

学习和使用jquery已经很长时间了，源码也读了很长一段时间了，但是感觉对jquery源码的理解还是非常浅，所以决定在深入细读一下jquery源码，并写点东西，方便以后温故知新！

源码学习的是jquery 2.0.3版本。

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




