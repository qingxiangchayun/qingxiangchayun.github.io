title: 正则 test 中的一个小坑
date: 2015-01-29 18:08:38
tags: js
---

今天做项目中，发现个问题，记录一下。

看个例子：
![regexp-test](/img/regexp-test.png)

为什么第一次`console`时，不都是`true`。WHY！！！


### 正则表达式
先来了解一下正则表达式
直接量语法
```
/pattern/attributes
```
创建 RegExp 对象的语法：
```
new RegExp(pattern, attributes);
```
修饰符
`g` : 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

test() 方法检索字符串中的指定值。返回值是 true 或 false。


### lastIndex 属性
`lastIndex` 属性用于规定下次匹配的起始位置。
语法
```
RegExpObject.lastIndex
```
说明
该属性存放一个整数，它声明的是上一次匹配文本之后的第一个字符的位置。

上次匹配的结果是由方法 RegExp.exec() 和 RegExp.test() 找到的，它们都以 lastIndex 属性所指的位置作为下次检索的起始点。这样，就可以通过反复调用这两个方法来遍历一个字符串中的所有匹配文本。

该属性是可读可写的。只要目标字符串的下一次搜索开始，就可以对它进行设置。当方法 exec() 或 test() 再也找不到可以匹配的文本时，它们会自动把 lastIndex 属性重置为 0。

<strong style="color:red;">重要事项：</strong>不具有标志 g 和不表示全局模式的 RegExp 对象不能使用 lastIndex 属性。
<strong style="color:red;">提示：</strong>如果在成功地匹配了某个字符串之后就开始检索另一个新的字符串，需要手动地把这个属性设置为 0。
![regexp-test](/img/regexp-test1.png)


