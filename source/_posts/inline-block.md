title: css学习之inline-block
date: 2015-04-14 11:04:54
tags: css
---

## inline-block

平时写代码，经常使用inline-block，但总觉得对inline-block了解还是不够深刻，所以写一篇blog，总结一下inline-block的知识点。


### 什么是inline-block
> This value causes an element to generate an inline-level block container. The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box.

inline-block 后的元素创建了一个行级的块容器，该元素内部（内容）被格式化成一个块元素，同时元素本身则被格式化成一个行内元素。

### IE6/7和标准浏览器对inline-block的区别
IE5.5 后开始支持 inline-block， 但是它所支持的 inline-block 不能等同于 CSS2.1 中的 inline-block，因为 IE5.5 比 CSS2.1 更早提出 inline-block 的概念并作为所谓的「私有属性值」使用，所以二者表现出来的效果是不完全一致。

### inline元素 display:inline-block
`.list{display:inline-block}` 或
`.list{display:inline-block;*zoom:1}`

**IE 5.5、6、7 中 inline 元素欲达到 inline-block 的效果只需直接设置display:inline-block或使用 zoom:1 等均可。**


![inline-block](/img/inline-block1.jpg)

### block元素 display:inline-block;*display:inline;*zoom:1;
IE 5.5、6、7 中 block 元素对 inline-block 支持不完整，如果要达到类似的效果，需要先设置为 display:inline，然后使用 zoom:1 等触发 hasLayout

IE6、7下未使用display:inline,zoom:1 
![inline-block](/img/inline-block2.jpg)

IE6、7下使用display:inline,zoom:1，而且不会产生水平空隙
![inline-block](/img/inline-block3.jpg)

### display:inline-block后的元素为什么会产生水平空隙
标准浏览器、IE6、7中inline元素会产生间隙。
造成空隙的根本性原因是：空白符（whitespace）

### 去除inline-block 产生的空隙 
解决方案来自于[一丝](http://ued.taobao.org/blog/2012/08/inline-block/)
``` css
.dib-wrap {
font-size:0;/* 所有浏览器 */
*word-spacing:-1px;/* IE6、7 */
}
.dib-wrap .dib{
font-size: 12px;
letter-spacing: normal;
word-spacing: normal;
vertical-align:top;
}
@media screen and (-webkit-min-device-pixel-ratio:0){
/* firefox 中 letter-spacing 会导致脱离普通流的元素水平位移 */
.dib-wrap{
letter-spacing:-5px;/* Safari 等不支持字体大小为 0 的浏览器, N 根据父级字体调节*/
}
}
.dib {
display: inline-block;
*display:inline;
*zoom:1;
}
```

letter-spacing : normal | length （检索或设置对象中的文字之间的间隔）
word-spacing : normal | length（检索或设置对象中的单词之间插入的空隔）

### demo
[demo](/demo/inline-block.html)

### 参考
* [http://ued.taobao.org/blog/2012/08/inline-block/](http://ued.taobao.org/blog/2012/08/inline-block/)
* [http://www.iyunlu.com/view/css-xhtml/79.html](http://www.iyunlu.com/view/css-xhtml/79.html)
* [http://www.iyunlu.com/view/css-xhtml/58.html](http://www.iyunlu.com/view/css-xhtml/58.html)
