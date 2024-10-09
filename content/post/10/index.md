---
title: '我的配置 | 解锁 Linux 终端的最佳体验'
date: 2024-07-09T21:23:23+08:00
slug: "unlock-best-experience-of-linux-terminal"
image: "cover.jpg"
tags:
  - command line
categories:
  - linux
# description: "最近体验了两个新的终端，还换了新的 command prompt: starship"
---

> 之前是一直用默认的终端模拟器，命令提示符的主题是 `oh-my-zsh` 的 `ys`，当然，并没有使用 `oh-my-zsh` 这个框架，因为太慢了，如果我的终端打开超过 0.5s 我就接受不了，所以用的是 `zinit` ，我之前[这篇文章](https://yaragos.top/p/zsh-plugin-manager-from-zplug-to-zinit/)讲了这个插件管理器。

## 终端模拟器

### wezterm

[我的 wezterm 配置](https://github.com/yaragos/dotfiles/blob/main/.wezterm.lua)

使用 lua 作为配置语言，在 Github 搜关键词 `wezterm config` 能看到 star 数最高的配置，那位大佬实现了彩色标签页，顶栏显示时间，随机背景图等功能，我不需要那么花哨，直接一个 `.wezterm.lua` 就搞定了。

当然功能还是比较简单的，只设置了一些常用的快捷键。wezterm 的内存占用还是挺高的，有一百多MB，当然启动速度还是挺快的，我默认终端是 `kitty`，更轻更快,内存占用 50MB 左右。

### kitty

[我的 kitty 配置](https://github.com/yaragos/dotfiles/tree/main/.config/kitty)

当然，我的 kitty 目前功能还是挺简陋的，kitty 似乎无法用鼠标拖动滚动条，所以每次通过鼠标滚轮或者快捷键翻页都挺慢的，之后有时间打算添加搜索的快捷键，方便我定位上面的文本，省的有时候找上面的输出要翻半天。

kitty 是不支持 fcitx 输入法的中文输入的，[这篇 issue 中提到了。](https://github.com/kovidgoyal/kitty/issues/469)

```sh
# 在 /etc/profile 中添加
GLFW_IM_MODULE=ibus
# 或在 ~/.profile
export GLFW_IM_MODULE=ibus
```

## 命令提示符 | cmd-prompt

[我的 starship 配置](https://github.com/yaragos/dotfiles/blob/main/.config/starship.toml)

我挺喜欢 oh-my-zsh 的 ys 主题的，一直使用的这个，无论是之前用 zplug 还是现在用 zinit,我都使用的 ys 主题，但 ys 主题依赖了一些 oh-my-zsh 的 plugin 和 lib, 为了精简我的 zsh 配置，我使用 starship 仿了个ys 主题，效果比原先的 ys 更好。

我的 starship 配置是需要有 NerdFont 字体支持的。

## 终端字体

终端字体当然是 nerd font 了，我的 nvim 和 starship 都需要 nerd font 字体。
我使用的是这两款：

[Cascadia Code | Github](https://github.com/microsoft/cascadia-code)

[JetBrains Mono | Github](https://github.com/JetBrains/JetBrainsMono)

## zsh 体验优化

### 补全和自动建议，历史命令搜索

- [fzf](https://github.com/junegunn/fzf) + [fzf-tab](https://github.com/Aloxaf/fzf-tab)

<kbd>Ctrl</kbd> + <kbd>t</kbd> 搜索文件路径，
<kbd>Ctrl</kbd> + <kbd>r</kbd> 搜索历史命令，
<kbd>Tab</kbd> 键补全命令参数或路径（这个好用）。

### vi mode

- [zsh-vi-mode](https://github.com/jeffreytse/zsh-vi-mode)

zsh 默认是有 vi mode 的，但默认的功能更简陋。而且这个插件虽然叫 vi mode，但不仅支持 vi 模式 ，还支持 emacs 模式。
需要注意这个插件和 fzf 有冲突，需要像下面这样解决：

[相关 issue](https://github.com/jeffreytse/zsh-vi-mode/issues/4)

```sh
# zsh-vi-mode
function zvm_config() {
  ZVM_LINE_INIT_MODE=$ZVM_MODE_INSERT
  ZVM_VI_INSERT_ESCAPE_BINDKEY=jk
}
function zvm_after_init() {
  bindkey -M vicmd "H" vi-first-non-blank
  bindkey -M vicmd "L" vi-end-of-line
  bindkey ' ' magic-space             # [Space] - don't do history expansion
  bindkey "\C-j" copy-prev-shell-word # file rename magick, use <C-m>
  source <(fzf --zsh)
}
zinit ice depth=1
zinit light jeffreytse/zsh-vi-mode
```

## 结语

[我的 zsh 配置](https://github.com/yaragos/dotfiles/blob/main/.zshrc)

我的其他配置比如 vim 和 nvim 都在 [dotfiles](https://github.com/yaragos/dotfiles) 仓库里。
