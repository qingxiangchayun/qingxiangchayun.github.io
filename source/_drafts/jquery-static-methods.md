title: jquery中常用的静态方法
tags: jQuery
---

## 工具方法列表

* $.each
* $.trim
* $.makeArray
* $.inArray
* $.merge
* $.grep
* $.map
* $.proxy




### $.each

```javascript
$.each = function( obj, callback, args ) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike( obj );

    if ( args ) {
        if ( isArray ) {
            for ( ; i < length; i++ ) {
                value = callback.apply( obj[ i ], args );

                if ( value === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                value = callback.apply( obj[ i ], args );

                if ( value === false ) {
                    break;
                }
            }
        }

    // A special, fast, case for the most common use of each
    } else {
        if ( isArray ) {
            for ( ; i < length; i++ ) {
                value = callback.call( obj[ i ], i, obj[ i ] );

                if ( value === false ) {
                    break;
                }
            }
        } else {
            for ( i in obj ) {
                value = callback.call( obj[ i ], i, obj[ i ] );

                if ( value === false ) {
                    break;
                }
            }
        }
    }

    return obj;
}
```
用法：

### $.makeArray
> 转换一个类似数组的对象成为真正的JavaScript数组
```javascript
$.makeArray = function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
        if ( isArraylike( Object(arr) ) ) { // 类数组 使用merge方法
            jQuery.merge( ret,
                typeof arr === "string" ?
                [ arr ] : arr
            );
        } else {
            core_push.call( ret, arr );  // 直接使用 arr.push
        }
    }

    return ret;
}

// isArraylike : 必须有length属性
function isArraylike( obj ) {
    var length = obj.length,
        type = jQuery.type( obj );
    
    if ( jQuery.isWindow( obj ) ) {
        return false;
    }

    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || type !== "function" &&
        ( length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}
```

### $.merge
> 合并两个数组(类数组)内容到第一个数组，第二个数组不会被修改;
代码实现：
```javascript
$.merge = function( first, second ) {
    var l = second.length,
        i = first.length,
        j = 0;

    
    if ( typeof l === "number" ) {  // second有length  [] / { 0 : ***, 1 : ***, lenght : num} eg : jquery 对象
        for ( ; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }
    } else {  // 类数组  { 0 : ***, 1 : *** }
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
}
```

### $.grep
```javascript
$.grep = function( elems, callback, inv ) {
    var retVal,
        ret = [],
        i = 0,
        length = elems.length;
    inv = !!inv;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
        retVal = !!callback( elems[ i ], i );
        if ( inv !== retVal ) {
            ret.push( elems[ i ] );
        }
    }

    return ret;
}
```

### $.map
```javascript
// arg is for internal usage only
$.map = function( elems, callback, arg ) {
    var value,
        i = 0,
        length = elems.length,
        isArray = isArraylike( elems ),
        ret = [];

    // Go through the array, translating each of the items to their
    if ( isArray ) {
        for ( ; i < length; i++ ) {
            value = callback( elems[ i ], i, arg );

            if ( value != null ) {
                ret[ ret.length ] = value;
            }
        }

    // Go through every key on the object,
    } else {
        for ( i in elems ) {
            value = callback( elems[ i ], i, arg );

            if ( value != null ) {
                ret[ ret.length ] = value;
            }
        }
    }

    // Flatten any nested arrays
    return core_concat.apply( [], ret );
}
```

### $.proxy
```javascript
// Bind a function to a context, optionally partially applying any
// arguments.
$.proxy = function( fn, context ) {
    var tmp, args, proxy;

    if ( typeof context === "string" ) {
        tmp = fn[ context ];
        context = fn;
        fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
        return undefined;
    }

    // Simulated bind
    args = core_slice.call( arguments, 2 );
    proxy = function() {
        return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
}
```

### jQuery 工具方法
$.parseHTML() -- Parses a string into an array of DOM nodes
> jQuery.parseHTML 使用原生的DOM元素的创建函数将字符串转换为一组DOM元素，然后，可以插入到文档中。
默认情况下，如果没有指定或给定null or undefined，context是当前的document。如果HTML被用在另一个document中，比如一个iframe，该frame的文件可以使用。


$.parseHTML Example 
```javascript
str = "hello, <b>my name is</b> jQuery.",
html = $.parseHTML( str ); --> [<TextNode textContent="hello, ">, b, <TextNode textContent=" jQuery.">]

for(var i=0,len=html.length; i<len; i++){
    console.log(html[i],html[i].nodeName); -->  <TextNode textContent="hello, "> #text
                                                <b> B
                                                <TextNode textContent=" jQuery."> #text
}
```
$.parseHTML 源码实现 

```javascript
// data: html 字符串
// context (optional): 默认值：当前页面的document对象，也可以是iframe中的document对象 如 contentWindow.document
// keepScripts (optional): 如果 true ，会解析script标签
// return Array : DOM元素数组
$.parseHTML = function( data, context, keepScripts ) {
    if ( !data || typeof data !== "string" ) {
        return null;
    }
    // context 是布尔值 表明只传了两个参数  function(data,boolean) 将第二个参数和第三个参数值互换
    if ( typeof context === "boolean" ) {
        keepScripts = context;
        context = false;
    }
    context = context || document;

    // rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
    var parsed = rsingleTag.exec( data ),
        scripts = !keepScripts && [];

    // Single tag
    // 单表签 <img /> <br /> <input /> eg: document.createElement('input');
    if ( parsed ) {
        return [ context.createElement( parsed[1] ) ];  
    }

    parsed = jQuery.buildFragment( [ data ], context, scripts );

    if ( scripts ) {
        jQuery( scripts ).remove();
    }

    return jQuery.merge( [], parsed.childNodes );
}
```
