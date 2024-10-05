---
title: 'Go | 接口型函数'
date: 2024-10-05T16:03:49+08:00
slug: "interface-function"
image: "cover.jpg"
# tags:
#   -
categories:
  - Golang
description: "看看 net/http 包下接口型函数的运用"
---

> 以下均摘自 Go 源码 [go/src/net/http/server.go](https://github.com/golang/go/blob/master/src/net/http/server.go)

## 接口型函数

- 以下代码中，定义了 `HandlerFunc` 函数类型，该类型的参数和返回值与 `Handler` 接口中的 `ServeHTTP` 是一致的，并绑定了 `ServeHTTP` 方法，在该方法中调用自己，从而实现了 ` Handler ` 接口。像这样实现了接口的函数类型，简称为接口型函数

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
// The HandlerFunc type is an adapter to allow the use of
// ordinary functions as HTTP handlers. If f is a function
// with the appropriate signature, HandlerFunc(f) is a
// [Handler] that calls f.
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}
```

## 接口型函数作为参数

- 通常有以下两种方式来映射请求路径和处理函数

```go
// 使用 http.HandleFunc()
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path)
}
func main() {
    // 映射根路径 "/" 到 handler 函数
    http.HandleFunc("/", handler)
    // 映射 "/hello" 到 handler 函数
    http.HandleFunc("/hello", handler)
    // 监听 8080 端口
    http.ListenAndServe(":8080", nil)
}

// 使用 http.Handle()
type customHandler struct{}
func (h *customHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from custom handler!")
}
func myHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from myHandler!")
}
func main() {
    // 使用自定义的 handler
    http.Handle("/custom", &customHandler{})
    // 使用 http.HandlerFunc 适配器
    http.Handle("/mypath", http.HandlerFunc(myHandler))
    http.ListenAndServe(":8080", nil)
}
```

在上面的使用 `http.Handle()` 的例子中，第二个参数不但可以是实现了 `http.Handler` 接口的结构体，还可以像 `http.HandleFunc()` 那样是普通函数，只需要在转换成 `http.HandlerFunc` 类型即可。

```go
// Handle registers the handler for the given pattern in [DefaultServeMux].
// The documentation for [ServeMux] explains how patterns are matched.
func Handle(pattern string, handler Handler) {
    if use121 {
        DefaultServeMux.mux121.handle(pattern, handler)
    } else {
        DefaultServeMux.register(pattern, handler)
    }
}

// HandleFunc registers the handler function for the given pattern in [DefaultServeMux].
// The documentation for [ServeMux] explains how patterns are matched.
func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
    if use121 {
        DefaultServeMux.mux121.handleFunc(pattern, handler)
    } else {
        DefaultServeMux.register(pattern, HandlerFunc(handler))
    }
}
```

对比两个方法的内部实现，发现内部逻辑并没有区别，只是 `http.HandleFunc` 会将传入的 `func(ResponseWriter, *Request)` 类型的参数转换成 `http.Handler` 类型。

我们再看 `http.ListenAndServe` 函数的实现，摘自 [http package - net/http - Go Packages](https://pkg.go.dev/net/http#ListenAndServe)

```go
func ListenAndServe(addr string, handler Handler) error {
    server := &Server{Addr: addr, Handler: handler}
    return server.ListenAndServe()
}

func (srv *Server) ListenAndServe() error {
    if srv.shuttingDown() {
        return ErrServerClosed
    }
    addr := srv.Addr
    if addr == "" {
        addr = ":http"
    }
    ln, err := net.Listen("tcp", addr)
    if err != nil {
        return err
    }
    return srv.Serve(ln)
}
```

可以看到第二个参数也是 `http.Handler` 类型，例子中 `http.ListenAndServe(":8080", nil)` 传入的是 `nil`，代表着使用标准库 `net/http` 内置的路由，如果传入的是一个实现了 `Handler` 接口的结构体就可以完全托管所有的 HTTP 请求。

## 结语

这样，既能够将普通的函数类型（需类型转换）作为参数，也可以将结构体作为参数，使用更为灵活，可读性也更好，这就是接口型函数的价值。
