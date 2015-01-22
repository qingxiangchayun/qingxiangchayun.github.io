title: hexo
tags: hexo
date: 2014-11-24 16:37:21
---

### hexo 常用命令
* 新建文章 `$ hexo new <title>`
* 新建草稿 `$ hexo new draft <title>`
* 草稿写好之后发布 `$ hexo publish [layout] <filename>`
* 生成静态内容 `$ hexo generate / hexo g`
* 启动本地服务 `$ hexo server / hexo s`
* 以草稿方式启动 **以这种方式启动可以一遍编辑一边预览** `$ hexo server --drafts`
* 部署 `$ hexo deploy / hexo d`

### 使用过程中遇到的问题
hexo deploy时，本地有多个git帐号时，且往github上提交的帐号不是global类型的，所以每次提交都会以本地开发的的用户提交  
解决方法：hexo deploy时 会在工程目录中生成一个 .deploy 的目录 cd 到 .deploy 目录下 设置用户名邮件
`$ cd /project/.deploy`
`$ git config user.name "Name"`
`$ git config user.email "Email"`

hexo2.8+ 代码前后多空行
解决方案：修改主题样式文件source/css/_base/code.styl
``` css
       @extend $line-numbers
       text-align right
       padding-right 1.5em
+    .line
+      height: 20px // 改为合适的值
   .gist
     margin 0.5em 0
```
[参考链接](https://github.com/wuchong/jacman/issues/16)