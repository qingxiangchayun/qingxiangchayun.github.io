title: jQuery source code
tags:
---

### jQuery 源码学习


``` 
jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: core_version,

    constructor: jQuery,
    init: function( selector, context, rootjQuery ) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        // false类型的值 返回 jquery 对象
        if ( !selector ) {
            return this;
        }

        // Handle HTML strings 字符串
        if ( typeof selector === "string" ) {
            // 标签 <tag> length >=3  '<b>、<i>'
            if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];

            } else {
                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && (match[1] || !context) ) {

                // HANDLE: $(html) -> $(array)
                // match[1] --> <tags ...>
                if ( match[1] ) {
                    context = context instanceof jQuery ? context[0] : context;

                    // scripts is true for back-compat
                    jQuery.merge( this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: $(html, props)
                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        for ( match in context ) {
                            // Properties of context are called as methods if possible
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;

                // HANDLE: $(#id)
                } else {
                    elem = document.getElementById( match[2] );

                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if ( elem && elem.parentNode ) {
                        // Inject the element directly into the jQuery object
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

            // HANDLE: $(expr, $(...))
            } else if ( !context || context.jquery ) {
                return ( context || rootjQuery ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor( context ).find( selector );
            }

        // HANDLE: $(DOMElement)
        } else if ( selector.nodeType ) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;

        // HANDLE: $(function)
        // Shortcut for document ready
        } else if ( jQuery.isFunction( selector ) ) {
            return rootjQuery.ready( selector );
        }

        if ( selector.selector !== undefined ) {
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return jQuery.makeArray( selector, this );
    }
};

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
// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
// return Array
parseHTML: function( data, context, keepScripts ) {
    if ( !data || typeof data !== "string" ) {
        return null;
    }
    if ( typeof context === "boolean" ) {
        keepScripts = context;
        context = false;
    }
    context = context || document;

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




