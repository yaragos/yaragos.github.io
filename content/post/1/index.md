+++
title = '为啥我选择 Linux 作为日常工作环境？'
date = 2024-07-19T18:59:24+08:00
slug = "why-i-choose-linux-as-my-daily-work-environment"
image = "cover.jpg"
tags = [
    "linux",
]
categories = [
    "Linux",
]
description = 'Windows我不考虑用作生产环境，对我来说它适合办公和娱乐，至于Mac目前手头上没有。'
# draft = true
+++

> 主要尝试了deb系比如debian, deepin, zorin, mint等以及arch系比如Manjaro, EndeavourOS等，桌面环境只尝试了Gnome和KDE,没尝试过各种WM。目前一直在用mint,它的Cinnamon桌面挺好用。

## why

1. 轻量，开机后占用内存很少，速度快，当初win11有时候拖动窗口都会卡顿，打开个IDE加载七八秒，实在用不下去。
2. 环境配置方便，安装和卸载软件也很方便，不像win...
3. 我不打游戏。

## 软件安装

像 git, vim 这些用apt安装就行（推荐`nala`，一个更好看的apt）；
像WPS, vscode 和 QQ, 微信等可以通过[星火应用商店](https://gitee.com/spark-store-project/spark-store)安装；
第三方包管理工具推荐[homebrew](https://brew.sh/)，挺多软件都可以用它安装，像docker, mysql, 还有各种开发环境；
部分软件就下载二进制文件安装，或者自己编译。

## 开发环境搭建和管理

主流语言环境直接brew安装就行，apt也行，就是版本旧了点。
开发环境的版本管理：node版本管理当然是大名鼎鼎的nvm,不过我目前用的是fnm,更轻量更快；golang版本管理就gvm;java版本管理就sdkman(sdkman不止管理jdk还有maven等)。

其实我就node切换管理频繁些，go就一个版本就够用了，像jdk,maven,maven,tomcat我就把常用的版本放在`~/env`目录下，在IDE中选择对应环境就行。

## 改键

为什么我要单独开个小标题讲这个呢？

首先对于主流配列我习惯交换左`Ctrl`和`Caps Lock`键，并且由于常用vim，我会设置`Caps Lock`键单独按是`Esc`组合按是`Ctrl`；且对于60%配列键盘要交换<kbd>\`</kbd>和<kbd>Esc</kbd>而80%配列键盘不交换。因为这些改键需求，我理想中的改键软件是能根据不同键盘设备使用不同的键位映射且能够实现较为复杂的映射。

如此苛刻的条件，我只发现[keyd](https://github.com/rvaiya/keyd)能满足我的要求，它是内核级别的改键，在x11和wayland下都能工作，通过编辑配置文件的配置方式便于我迁移配置。但它只支持Linux，唉，Mac这键位也是难受。

键盘这块，我的想法是以后整把支持via的70%配列键盘，弥补改键软件这方面的空缺，让不同平台的体验尽量一致。
