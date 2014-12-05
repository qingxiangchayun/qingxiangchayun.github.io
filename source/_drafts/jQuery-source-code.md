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

推荐使用正则可视化工具：[http://jex.im/regulex/](http://jex.im/regulex)

`rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/`

> (?:pattern) : 匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。
> \s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \f\n\r\t\v]。
> \w 匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。
> .点 匹配除“\r\n”之外的任何单个字符。要匹配包括“\r\n”在内的任何字符，请使用像“[\s\S]”的模式。

> exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。

* 以`\s*` 0个或多个空白字符 `<[\w\W]+>` <多个字符>  `[^>]*` 不是 > 的任意字符开始
* 以 `#([\w-]*)` #[A-Za-z0-9_]或-的0个或多个字符结尾

```javascript
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
var html = '<div>';
var html1 = '   <div class="div">  ';
var html2 = '<div class="div"> </div> <div></div>';
var html3 = '#id';
var html4 = '<div class="div"></div>#id';

rquickExpr.exec(html) --> ["<div>", "<div>", undefined]
rquickExpr.exec(html1) --> [" <div class="div"> ", "<div class="div">", undefined]
rquickExpr.exec(html3) --> ["#id", undefined, "id"]
rquickExpr.exec(html4) --> ["<div class="div"></div>#id", "<div class="div"></div>", undefined]

```

![rquickExpr](/img/jquery-rquickExpr.png);



