---
title: '为什么我选择 Go 语言'
date: 2024-10-09T10:45:56+08:00
slug: "why-i-choose-go"
image: "cover.jpg"
tags:
  - go
categories:
  - golang
description: "不聊前景、生态和技术，只聊语法"
---

> 上手 Go 的最大感受是它的简洁和一致性，看起来像 C 和 Python 的结合体，但又不失严谨性。

## \{\}

Go 的 `if` 和 `for` 语句必须用 `{}` 包裹，且必须紧跟 `{`，不能像 C 系语言那样另起一行。
这样的设计让代码层次更清晰，同时限制了代码风格，让代码看起来更一致。

我个人认为编程语言的设计上就应该限制代码风格，让不同的程序员写出一致的代码，这样才能让代码更易读、易维护。

另外声明变量使用 var，定义函数使用 func 等，同样让代码更一致。

```go
if ok := check(); ok {
    // do something
} else {
    // do something else
}
```

## 简短的命名

点名 Java，一堆嵌套的 package 和长长的类名和方法名，让人头大。
再看 Go 源码中一些变量和函数的命令，简洁明了。

`len()` `cap()` `prev` `ctx`

这些变量不是很容易看出全称吗？不明白 Java 源码中为什么命名要写上完整的单词。

## 符号美学

`:=` 声明并赋值

`[]` 切片、数组、map、泛型

`...` 可变参数、切片展开

`<-` channel 操作符

## 自动分号插入机制

[Go 官方说明](https://go.dev/ref/spec#Semicolons)

{{< card >}}
The formal syntax uses semicolons ";" as terminators in a number of productions. Go programs may omit most of these semicolons using the following two rules:

1. When the input is broken into tokens, a semicolon is automatically inserted into the token stream immediately after a line's final token if that token is

- an identifier
- an integer, floating-point, imaginary, rune, or string literal
- one of the keywords break, continue, fallthrough, or return
- one of the operators and punctuation ++, --, ), ], or }

2. To allow complex statements to occupy a single line, a semicolon may be omitted before a closing ")" or "}".

To reflect idiomatic use, code examples in this document elide semicolons using these rules.
{{< /card >}}

Go 语言自动添加分号的规则:

Go 编译器会在词法分析阶段（lexical analysis）进行自动分号插入。 其核心规则是：如果一行代码的结尾符合特定条件，则在该行结尾处自动插入一个分号。 这些条件主要包括：

- 行尾是标识符: 变量名、函数名等
- 行尾是字面量: 整数、浮点、虚数、rune、string 字面量
- 行尾是关键词: 某些特定的关键词，例如 break、continue、fallthrough 或 return
- 行尾是运算符或分隔符: 某些特定的运算符或分隔符，例如 ++、--、)、] 或 }

以上规则导致 `{` 必须紧跟在语句或声明之后，否则 Go 编译器会自动在 `{` 前插入分号，导致报错。
通过限制分号的省略，Go 语言鼓励程序员采用一种更规范、更易于阅读的代码风格。 这使得 Go 代码更易于维护和协作。

## gofmt

gofmt 工具强制代码格式，保证了所有 Go 代码风格的一致性，提高了代码的可读性和可维护性。
虽然这在一定程度上限制了程序员的自由，但从整体项目代码风格统一的角度来看，这种强制性是值得的。

## 结语

结语。
