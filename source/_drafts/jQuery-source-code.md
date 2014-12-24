title: jquery 选择器
tags:
---

## jquery.fn.init

### 了解jquery()
#### 用法
* jQuery( selector [, context ] )
    * jQuery( selector [, context ] )
    * jQuery( element )
    * jQuery( elementArray )
    * jQuery( object )
    * jQuery( selection )
    * jQuery()
* jQuery( html [, ownerDocument ] )
    * jQuery( html [, ownerDocument ] )
    * jQuery( html, attributes )
* jQuery( callback )
    * jQuery( callback )

#### 实例
* $(#id) $(.class) $(#id .class) $('li') 选择元素
* $('&lt;li&gt;') $('&lt;li&gt;1&lt;/li&gt;&lt;li&gt;1&lt;/li&gt;') 创建标签
* $(this) $(document)
* $(function(){}) document.ready
 
### 源码

``` 
jQuery.fn = jQuery.prototype = {

    // $ 用法： 
    // $(#id) $(.class) $('div') $(#id .class) 选择元素
    // $('<div>') $('<div>1</div><div>2</div>') 创建元素

    // $(this) $(document)

    // $(function(){})

    init: function( selector, context, rootjQuery ) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if ( !selector ) {
            return this;
        }

        // Handle HTML strings 
        if ( typeof selector === "string" ) {
            if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                // Assume that strings that start and end with <> are HTML and skip the regex check

                // 创建元素 $('<div>') $('<div>1</div><div>2</div>')
                // match = [ null, '<div>', null]
                // match = [ null, '<div>1</div><div>2</div>', null]
                
                match = [ null, selector, null ];

            } else {
                // $('#id') $('.class') $('div') $('#id .class') 选择元素
                // $('<div>111') == $('<div>')

                // match = null ; $(.class) $('div') $(#id .class)
                // match = ['#id', null, 'id'];  $(#id)
                // match = ['<div>111', '<div>' , null] // $('<div>111')

                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && (match[1] || !context) ) {  // 能进if的  $(#id)  $('<div>') $('<div>1</div><div>2</div>')

                // HANDLE: $(html) -> $(array)
                if ( match[1] ) { 
                    // $('<div>') $('<div>1</div><div>2</div>')

                    context = context instanceof jQuery ? context[0] : context;

                    // scripts is true for back-compat
                    jQuery.merge( this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: $(html, props)
                    // $('<div>',{ title : 'title', html : 111})

                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        // rsingleTag.test( match[1] )  <li>/ <li></li> <img/>

                        for ( match in context ) {
                            // eg : html方法 css方法 直接调用

                            // Properties of context are called as methods if possible
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                // 使用attr 方法设置属性

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
        // $(function) == document.ready(fn);
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

![jquery-init-$](/img/jquery-init-$.jpg);




