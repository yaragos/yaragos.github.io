---
title: '我博客上的那些短代码'
date: 2024-07-28T12:11:01+08:00
slug: "shortcodes-my-blog-use"
image: "cover.jpg"
tags:
  - hugo
# categories:
#   -
description: "博客由hugo搭建，我使用的是Stack主题，分享一些我博客上的shortcode"
---

## Short Code

{{< abbr "缩写（鼠标放上来查看）" "缩写内容" >}}

---

{{< align left "文字居左" >}}
{{< align center "文字居中" >}}
{{< align right "文字居右" >}}

---

{{< chat pos="left" name=Alice time="2023-07-01 12:00" >}}
Left message.
{{< /chat >}}
{{< chat name=Bob time="2024-07-01 12:01" >}}
Right message.
{{< /chat >}}

---

{{< shake shake >}}这是基本的摇晃效果。{{< /shake >}}
{{< shake shake-hard >}}这个段落有剧烈摇晃效果。{{< /shake >}}
{{< shake shake-slow >}}这个段落有慢速摇晃效果。{{< /shake >}}
{{< shake shake-little >}}这个段落有轻微摇晃效果。{{< /shake >}}
{{< shake shake-horizontal >}}这个段落有水平摇晃效果。{{< /shake >}}
{{< shake shake-vertical >}}这个段落有垂直摇晃效果。{{< /shake >}}
{{< shake shake-rotate >}}这个段落有旋转摇晃效果。{{< /shake >}}
{{< shake shake-opacity >}}这个段落有透明度变化摇晃效果。{{< /shake >}}
{{< shake shake-crazy >}}这个段落有疯狂摇晃效果。{{< /shake >}}
{{< shake shake-freeze >}}这个段落在悬停时冻结。{{< /shake >}}
{{< shake shake-constant >}}这个段落持续摇晃。{{< /shake >}}

---

<font class="colorfulfont">文字颜色渐变<br>第二行222222<br>第三行3333333333</font>

---

{{< blockquote author="作者" link="https://www.baidu.com" title="作品名（点击跳转）" >}}
这是引用内容
{{< /blockquote >}}

{{< quote-center >}}
这是居中引用
第二行
{{< /quote-center >}}

---

键盘按键：<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>`</kbd>

---

打分：{{< rating 10 8 >}}

---

{{< card >}}
这里是卡片内容
不能插入图片
{{< /card >}}

---

{{< notice notice-warning >}}
This is a warning.
{{< /notice >}}

{{< notice notice-info >}}
This is a info.
{{< /notice >}}

{{< notice notice-note >}}
This is a note.
{{< /notice >}}

{{< notice notice-tip >}}
This is a tip.
{{< /notice >}}

{{< detail "展开看内容" >}}
内容
{{< /detail >}}

---

高斯模糊效果（鼠标放上去查看）:
<span class="blur">帅到模糊</span>

---
- 轮播图

{{< imgloop "1.jpg,2.jpg,3.jpg" >}}

## Link

- [我参考的这篇文章](https://www.sleepymoon.cyou/2023/hugo-shortcodes/)
- 我挑选了部分我认为有用的shortcode,并对部分进行了修改，有需要的可以去我Github仓库查看源码。