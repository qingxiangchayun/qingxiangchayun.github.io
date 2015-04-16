title: css学习之display、position、float之间的关系
date: 2015-04-16 16:09:09
tags: css
---

当css样式中，同时具有display、position、float属性时，具体会如何表现。[w3c规范](http://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo)中有具体的规定。
了解display、position、float之间的关系，有助于我们更好的书写css，及明白为什么css排版会如此表现。

>If 'display' has the value 'none', then 'position' and 'float' do not apply. In this case, the element generates no box.
Otherwise, if 'position' has the value 'absolute' or 'fixed', the box is absolutely positioned, the computed value of 'float' is 'none', and display is set according to the table below. The position of the box will be determined by the 'top', 'right', 'bottom' and 'left' properties and the box's containing block.
Otherwise, if 'float' has a value other than 'none', the box is floated and 'display' is set according to the table below.
Otherwise, if the element is the root element, 'display' is set according to the table below, except that it is undefined in CSS 2.1 whether a specified value of 'list-item' becomes a computed value of 'block' or 'list-item'.
Otherwise, the remaining 'display' property values apply as specified.

1、display:none --> position、float 不起作用。
2、position:absolute/fixed --> float:none, display按下表设置。
3、float:left/right --> display按下表设置
4、float:none --> root元素--> display按下表设置


![display-position-float.jpg](/img/display-position-float.jpg)
![display-position-float1.jpg](/img/display-position-float1.png)
