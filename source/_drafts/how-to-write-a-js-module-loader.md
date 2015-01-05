title: 如何写一个js的模块加载器
tags: [js,requirejs]
---

## module

### requirejs 实现基础

如何写一个js的模块加载器，类似于requirejs，那么我们首先了解一下requirejs。

requirejs 用法：

`define(id?, dependencies?, factory);`

1、 requirejs预加载。 每个模块所依赖的其他模块都会比本模块预先加载。


![requirejs-jsonload](/img/requirejs-jsonload.png);











