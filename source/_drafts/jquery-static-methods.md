title: jquery中常用的工具方法
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
```javascript
$.makeArray = function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
        if ( isArraylike( Object(arr) ) ) {
            jQuery.merge( ret,
                typeof arr === "string" ?
                [ arr ] : arr
            );
        } else {
            core_push.call( ret, arr );
        }
    }

    return ret;
}
```

### $.merge
```javascript
$.merge = function( first, second ) {
    var l = second.length,
        i = first.length,
        j = 0;

    if ( typeof l === "number" ) {
        for ( ; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }
    } else {
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
