title: jquery deferred
date: 2015-01-22 17:12:03
tags:
---

## deferred API

延迟对象，在jQuery的1.5引入，是通过调用jQuery.Deferred()方法创建一个可链式调用的工具对象。 它可以注册多个回调到回调队列， 调用回调队列，准备代替任何同步或异步函数的成功或失败状态。

### jQuery.Deferred()
一个构造函数，返回一个链式实用对象方法来注册多个回调，回调队列， 调用回调队列，并转达任何同步或异步函数的成功或失败状态。

![jquery-deferred-object](/img/jquery-deferred-object.png);

``` javascript
function fn1() {
    alert('success')
}
function fn2() {
    alert('fail')
}
function fn3() {
    alert('progress')
}
var deferred = $.Deferred()
deferred.done(fn1).fail(fn2).progress(fn3) // 链式操作
setTimeout(function() {
    //deferred.resolve()  执行done函数 --> success
    //deferred.reject()   执行fail函数 --> fail
    //deferred.notify()   执行progress函数 --> progress
}, 1000)

```

### deferred.always()
`deferred.always( alwaysCallbacks [, alwaysCallbacks ] )`  `Returns: Deferred`
当Deferred（延迟）对象解决或拒绝时，调用添加处理程序。

### deferred.done()
`deferred.done( doneCallbacks [, doneCallbacks ] )` `Returns: Deferred`
doneCallbacks : 函数或函数数组
当Deferred（延迟）对象解决时，调用添加处理程序。

### deferred.then()
`deferred.then( doneFilter [, failFilter ] [, progressFilter ] )`;

``` javascript
function fn1() {
    alert('success')
}
function fn2() {
    alert('fail')
}
function fn3() {
    alert('progress')
}
var deferred = $.Deferred()
deferred.then(fn1, fn2, fn3)
```

### deferred.when()
`jQuery.when( deferreds )`
deferreds : 一个或多个延迟对象，或者普通的JavaScript对象。

如果一个参数被传递给jQuery.when() ， 并且它不是一个Deferred或Promise对象， 那么它会被当作是一个被解决（resolved）的延迟对象，并且绑定到上面的任何 doneCallbacks 都会被立刻执行。

``` javascript
var d1 = new $.Deferred();
var d2 = new $.Deferred();
var d3 = new $.Deferred();
$.when( d1, d2, d3 ).done(function ( v1, v2, v3 ) {
	console.log( v1 ); // v1 is undefined
	console.log( v2 ); // v2 is "abc"
	console.log( v3 ); // v3 is an array [ 1, 2, 3, 4, 5 ]
});
d1.resolve();
d2.resolve( "abc" );
d3.resolve( 1, 2, 3, 4, 5 );
```

### deferred.progress()
`deferred.progress( progressCallbacks )`  `Returns: Deferred `
progressCallbacks : 函数或函数数组。
当Deferred（延迟）对象生成进度通知时，调用添加处理程序。

## deferred 源码实现

## 如何自己实现一个deferred函数
