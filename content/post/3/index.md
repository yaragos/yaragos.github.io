---
title: 'Nushell | 一种很新的shell'
date: 2024-07-24T15:42:04+08:00
slug: "nushell-a-new-shell"
image: "cover.jpg"
tags:
  - linux
  - shell
categories:
  - Linux
description: 今天看到一个挺现代化的shell，就尝试了一下
---

> 像这样现代的shell,以前听说过fish,也简单尝试过，一种交互式的shell,通过打开浏览器进行配置，方便快捷。
> 今天看到这样一种新颖的shell,就体验了一下，它Github还挺多start的，Rust语言编写，跨平台，文档有中文，太友好了。

## Overview

{{< imgloop "image.png,image1.png,image2.png,image3.png" >}}

- [官网：https://www.nushell.sh/zh-CN/](https://www.nushell.sh/zh-CN/)
- [Github：https://github.com/nushell/nushell](https://github.com/nushell/nushell)

- Nushell 有许多不同与bash这类传统shell的特性（看官网感觉挺深奥的）。
- 开箱即用，自带了历史命令，自动补全，语法高亮，清晰的错误提示，彩色输出等功能。
- Nushell 通过管道传递结构化数据，并且通过内置命令很方便地进行排序和过滤数据，而不需要像传统shell那样用awk,sed,grep等命令来解析字符串，让使用者专注于解决问题本身而不需要花过多心思去处理数据。
- 内置命令挺多，想ls,cd等基础命令它都内置了，ls输出格式挺美观。

## 结语

我只是通过brew安装尝试了一下，我之前一直是使用zsh的，配置的挺完美了，而且Nu的语法和zsh不同，配置文件也不在`~`目录而是在`~/.config/nu`，不适合作为我的日用shell。它目前开发还是挺活跃的，期待以后的发展。