title: css学习之margin外边距叠加
date: 2015-04-15 18:06:12
tags: css
---

Collapsing margins：外边距折叠，指的是毗邻的两个或多个外边距 (margin) 会合并成一个外边距。

### margin外边距叠加
* 这两个或多个外边距没有被非空内容、padding、border 或 clear 分隔开。
* 这些 margin 都处于普通流中

### margin外边距叠加仅仅发生在BFC
当元素的display属性设为inline-block，不会发生叠加。

### margin外边距叠加不发生在float
当元素具有float属性时，会脱离文档流，不会发生叠加。

### 父元素创建了块级格式化上下文，不和它的子元素发生 margin 折叠
当父元素使用overflow：hidden,或其他方式创建BFC时，不会和子元素发生 margin 折叠。

### 父元素具有padding或border时，不和它的子元素发生 margin 折叠
当父元素有padding属性或者border属性，不会和子元素发生 margin 折叠。

### demo
[margin外边距叠加demo](/demo/collapsing-margins.html){:target="_blank"}
