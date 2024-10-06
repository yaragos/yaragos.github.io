+++
title = "shortcode汇总"
slug = "shortcode-summary"
date = "2024-07-01"
description = "用于写作时方便复制Shortcode的页面"
tags = [
    "markdown",
    "themes",
]
draft = true
weight = 1
+++

## 颜色渐变

{{< highlight html >}}
<font class="colorfulfont">文字颜色渐变</font>
{{< /highlight >}}

## 引用框

```
{{</* blockquote author="作者" link="https://www.baidu.com" title="作品名" */>}}
引用内容,作者和链接可以不写，链接要带`https://` 开头
{{</* /blockquote */>}}
```

---

```
{{</* quote-center */>}}
居中引用
{{</* /quote-center */>}}
```

## 对话框

```
{{</* chat pos="left" name=Alice time="2023-07-01 12:00" */>}}
Left message.
{{</* /chat */>}}

{{</* chat name=Bob time="2024-07-01 12:01" */>}}
Right message.
{{</* /chat */>}}
```

## 卡片

```
{{</* card */>}}
卡片内容
{{</* /card */>}}
```

## 通知框

```
{{</* notice notice-warning */>}}
warning
{{</* /notice */>}}

{{</* notice notice-info */>}}
info
{{</* /notice */>}}

{{</* notice notice-note */>}}
note
{{</* /notice */>}}

{{</* notice notice-tip */>}}
tip
{{</* /notice */>}}
```

## 展开

```
{{</* detail "展开看内容" */>}}
内容
{{</* /detail */>}}
```

## 文字居中等

```
{{</* align left "文字居左" */>}}
{{</* align center "文字居中" */>}}
{{</* align right "文字居右" */>}}
```

## 文字摇晃

```
{{</* shake shake */>}}基本的摇晃效果{{</* /shake */>}}

{{</* shake shake-hard */>}}剧烈摇晃效果{{</* /shake */>}}

{{</* shake shake-slow */>}}慢速摇晃效果{{</* /shake */>}}

{{</* shake shake-little */>}}轻微摇晃效果{{</* /shake */>}}

{{</* shake shake-horizontal */>}}水平摇晃效果{{</* /shake */>}}

{{</* shake shake-vertical */>}}垂直摇晃效果{{</* /shake */>}}

{{</* shake shake-rotate */>}}旋转摇晃效果{{</* /shake */>}}

{{</* shake shake-opacity */>}}透明度变化摇晃效果{{</* /shake */>}}

{{</* shake shake-crazy */>}}疯狂摇晃效果{{</* /shake */>}}

{{</* shake shake-freeze */>}}在悬停时冻结{{</* /shake */>}}

{{</* shake shake-constant */>}}持续摇晃{{</* /shake */>}}
```

## 键盘按键

{{< highlight html >}}
<kbd>Ctrl</kbd>
{{< /highlight >}}

## 星星

- rating用法：总星数 实际星数；不可以打半星

```
{{</* rating 10 7 */>}}
```

## 高斯模糊

{{< highlight html >}}
<span class="blur">高斯模糊</span>
{{< /highlight >}}

## 轮播图

```
{{</* imgloop "1.jpg,2.jpg" */>}}
```

## 缩写

```
{{</* abbr "缩写" "缩写内容" */>}}
```
