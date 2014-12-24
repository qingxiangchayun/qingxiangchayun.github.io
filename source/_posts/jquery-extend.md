title: jquery extend方法学习
tags: jQuery
date: 2014-12-24 17:33:48
---

## jquery extend

### 语法
jQuery.extend( [deep] target [, object1 ] [, objectN ] )  Returns:Object

### 描述
将两个或更多对象的内容合并到第一个对象。

### 实例
![jquery-extend-example](/img/jquery-extend-example.png)

> Merge defaults and options, without modifying the defaults. This is a common plugin development pattern.
```
var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
// Merge defaults and options, without modifying defaults
var settings = $.extend( {}, defaults, options );

defaults -- {"validate":false,"limit":5,"name":"foo"}
options -- {"validate":true,"name":"bar"}
settings -- {"validate":true,"limit":5,"name":"bar"}
 
```

### 源码实现

``` javascript
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    // deep与target值互换 i=2
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    // 容错处理
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    // 只传一个参数 == 给jQuery对象扩展 属性和方法
    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}
```

### 思考
为什么 jquery.extend(copy方法) 和 jquery.fn.extend(为实例对象扩展方法) 可以使用同一套代码实现？

### 实现一个简单的extend方法
```
/**
 * extend
 * @target  {[Object]} 
 * @clone  {[Object]}
 * @deep  {[Boolean]} 是否深copy
 * @return {[Object]} target 
 */
function extend(target,clone,deep){
    var deep = deep ? deep : false;
    if(deep){

        for(var key in clone){
            if(typeof clone[key] === 'object'){
                extend(deep,target[key],clone[key]);
            }else{
                target[key] == clone[key];
            }
        }

    }else{
        for(var key in clone){
            target[key] = clone[key];
        }
    }

    return target;
}
```

### tips





