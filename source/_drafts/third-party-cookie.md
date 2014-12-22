title: 第三方cookie
tags: js
---

## 第三方cookie、P3P

### 问题

在做外链视频续波功能，发现第三方cookie在IE下读写有错，

a.com 引入 b.com ：<\iframe src="www.b.com">
b.com 中需写入cookie，记录上次播发的点，以达到续播，很简单的功能，但是在开发测试中发现IE浏览器下cookie写不进去，
IE浏览器的隐私设置没有更改，为中级，调为低级就可以写。

![thirdPartCookie](/img/third-part-cookie.png);
![thirdPartCookie](/img/third-part-cookie-ie.png);

### 解决方案：P3P

在请求头中加入 -- jsp
```
<%
	response.addHeader("p3p", "CP=\"CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR\"");
%>
```

### 参考资料：
[http://oldj.net/article/third-party-cookie](http://oldj.net/article/third-party-cookie)