---
title: 'Go 切片增长策略'
date: 2024-08-17T19:57:40+08:00
slug: "slice-grow-strategy-in-go"
image: "cover.jpg"
tags:
  - go
categories:
  - golang
description: "1.18版本切片扩容策略发生"
math: true
---

## 前言

> 起因是一篇文章提到 Go 的切片扩容策略是“容量小于 1024 时，容量翻倍；容量大于等于 1024 时，容量增加 25%”。而我本地测试后与作者得出结论不同，故而上网搜寻资料。

## 正文

- 我尝试输出当切片长度从0增加到2000时，切片的容量变化情况，代码如下：

```go
package main

import (
	"fmt"
)

func main() {
	slice := []int{}
	fmt.Println("[INIT] len=", len(slice), "cap=", cap(slice))

	preCap := cap(slice)
	for i := 1; i <= 2000; i++ {
		slice = append(slice, i)
		if preCap != cap(slice) {
			fmt.Println("len=", len(slice), "cap=", cap(slice))
			preCap = cap(slice)
		}
	}
}
```

- 运行结果如下：

```
[INIT] len= 0 cap = 0
len= 1 cap= 1
len= 2 cap= 2
len= 3 cap= 4
len= 5 cap= 8
len= 9 cap= 16
len= 17 cap= 32
len= 33 cap= 64
len= 65 cap= 128
len= 129 cap= 256
len= 257 cap= 512
len= 513 cap= 848
len= 849 cap= 1280
len= 1281 cap= 1792
len= 1793 cap= 2560
```

这显然不符合我在文章中看到的策略，找到一篇文章，其中提到 1.18 版本后策略如下：

{{< card >}}
当原slice容量(oldcap)小于256的时候，新slice(newcap)容量为原来的2倍；
原slice容量超过256，新slice容量 $newcap = oldcap+(oldcap+3*256)/4$。
{{< /card >}}

这才对上了。
关于这个策略的实现，在 [src/runtime/slice.go](https://github.com/golang/go/blob/889abb17e125bb0f5d8de61bb80ef15fbe2a130d/src/runtime/slice.go#L177) 的 `growslice` 函数，目前源码中的乘除运算已经被替换成了位运算，所以看起来比较复杂。

## 结语

[参考文章](https://golang.design/go-questions/slice/grow/)

- 在查找资料的过程中发现，哪怕是 1.18 以前的版本，在容量超过 1024 后，也不是严格按照 25% 增长，因为计算出 newcap 后，作了一个**内存对齐**，这和内存分配策略相关。最后的容量会大于等于基于前面计算得出的 newcap.

- 切片扩容的策略优化后，$newcap=oldcap+(oldcap+3*256)/4$, 通过添加一个常量让底层数组大小的增长更加平滑。
