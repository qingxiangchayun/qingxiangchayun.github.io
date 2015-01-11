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


```
// data 构造函数  定义了两个属性
// cache = {}
// expando = jQuery.expando + Data.uid++
function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}
```
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
```
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */

	// 文本节点、注释节点 不能分配标识
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};
Data.accepts = jQuery.acceptData;

// data 原型
Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
}
```



