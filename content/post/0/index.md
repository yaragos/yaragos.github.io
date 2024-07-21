+++
title = "Example Page"
slug = "example-page"
date = "2024-07-01"
description = "Example description"
tags = [
    "markdown",
    "themes",
]
image = "cover.jpg"
draft = true
+++

This is a example page.
Built by `Hugo` with `Stack` theme.

## Tables

Tables aren't part of the core Markdown spec, but Hugo supports supports them out-of-the-box.

   Name | Age
--------|------
    Bob | 27
  Alice | 23

## Short Code

{{< abbr "HTTP" "Hyper Text Transfer Protocol" >}}

{{< align center "This is a centered text." >}}

{{< chat pos="left" name='Alice' time="2024-07-01 12:00" >}}
Left message.
{{< /chat >}}

{{< chat name='Bob' time="2024-07-01 12:01" >}}
Right message.
{{< /chat >}}


## Math

$f(x) = x^2 + 1$

$$
f(x) = x^2 + 1
$$

## Links

[baidu百度](https://www.baidu.com)

[google谷歌](https://www.google.com)

## Code Blocks

```diff
- features = ["dynamic"]
+ features = ["jpeg", "dynamic"]
```

<br>
