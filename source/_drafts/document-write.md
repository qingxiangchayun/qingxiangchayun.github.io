title: document.write方法的相关问题
tags: js
---

## document.write

### document.write 介绍
```javascript
document.write(markup);
```
`markup` is a string containing the text to be written to the document.

### 加载
* 在`DOM Ready`之**前**执行document.write(),会往页面上追加内容
* 在`DOM Ready`之**后**执行document.write(),会先清空页面内容，在写入新的内容；
相当于 `document.open()` --> 	`document.write()` --> `document.close()`

### 同步
`document.write()` 引入的js，加载方式为**同步**;



