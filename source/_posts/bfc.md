title: css学习之BFC
date: 2015-04-16 11:39:24
tags: css
---

### Formatting context

Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

### BFC 定义
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

### BFC布局规则

* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

### 哪些元素会生成BFC

* 根元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible( hidden,scroll,auto, )

是这些元素创建了块格式化上下文，它们本身不是块格式化上下文。
"display:table" 本身并不产生 "block formatting contexts"。但是，它可以产生匿名框， 其中包含 "display:table-cell" 的框会产生块格式化上下文。 总之，对于 "display:table" 的元素，产生块格式化上下文的是匿名框而不是 "display:table"。

### BFC 作用

* 可以包含浮动元素
* 可以阻止外边距折叠
* 可以防止元素被浮动元素覆盖


### 参考
* [BFC 神奇背后的原理](http://blog.melonhuang.gitpress.org/~docs/css/1formattingContext.md)
* [格式化上下文( Formatting context )](http://www.w3help.org/zh-cn/kb/010/)
* [Visual formatting model](http://www.w3.org/TR/CSS2/visuren.html#block-formatting)