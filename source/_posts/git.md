title: Git 基本配置及常用命令
date: 2015-05-21 16:37:34
tags: git
---

### 基础配置
* `git config user.name xxx `
* `git config --global user.name xxx ` 
* `git config --system user.name xxx `

### 忽略不同系统下的空格(^M)
* window 换行符 \r\n 
* Linux 换行符 \n
* `git config --global core.autocrlf true `

### 设置命令别名
`git config --global alias.lg "log --graph--oneline--decorate"`

### 命令输入中开启颜色显示
`git config --global color.ui true`

### 查看状态 status
* `git status `
* `git show <commit>` 显示此次修改的内容等信息
* `git whatchanged HEAD^..HEAD` 比较两次提交之间有什么修改的文件

### add 提交到缓存区
* `git add .`
* `git add <file>`
* `git add -u` -u 把工作区中删除的文件添加到缓存区

### 提交缓存区中的文件到本地版本库
* `git commit -m "comments"`
* `git commit -amend` 修改上次提交的注释
* `git commit -a` 对本地所有变更的文件执行提交操作，减少 git add 的操作

### 查看版本库的提交日志
* `git log --pretty=fuller` 显示提交的一些详细信息
* `git log --stat` 每次提交的文件变更统计
* `git log --oneline` 在一行显示提交日志
* `git log --pretty=row` 显示提交的父节点和 tree
* `git log --graph` 显示提交 tree 跟踪链条
* `git log --p` 显示修改详情
* `git log --decorate master dev` 显示分支标记

### 查看分支
`git branch` 

### 对比文件区别
* `git diff` 比较工作区和缓存区的区别
* `git diff HEAD` 比较工作区和版本库的区别
* `git diff --cached` 比较缓存区和版本库的区别

### 重置
* `git reset --hard <commit>` 替换引用的指向到指定提交，同时改变缓存区和工作区内容
* `git reset --hard <file>` 将 file 的改动撤出缓存区，相当于对 add 命令的反操作

### 检出
* `git checkout -- <file>` 用缓存区指定的文件替换工作区文件
* `git checkout -- .` 用缓存区所有文件替换工作区文件
* `git checkout HEAD` 用 HEAD 指向的分支的所有文件替换暂缓区和工作区文件
* `git checkout <branch-name>` 切换分支
* `git clean -fd` 清除当前工作区中没有加入版本库中的文件和目录

### 提交
* `git push origin origin/branch-name:branch-name` 从远程的一个分支提交到另外一个远程分支
* `git push origin <空>:branch-name`  删除一个远程分支

### cherry-pick
`git cherry-pick <commit>` 把一个分支 commit 修改的内容应用到当前分支
使用 git cherry-pick 和 git reflog 可以找回 git reset 删除的点

