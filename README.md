# Amis Playground

一个最简单的 amis 项目在线练习场，以最低成本的方式，尝试各种amis功能（包括：自定义组件，`amisEditor` 等高级功能）。

如果发现 “本项目的BUG” 或 “有优化建议”，[请提issue](https://github.com/ovineio/amis-playground/issues)。

> 如果本项目对你有帮助，欢迎 start 与 分享，thx ～～

## 项目背景：

amis 组件多，配置简单， 被广大开发者使用。但是大部份初级开发者还是基于 `amisEditor` 进行配置纯 Json，实现功能。这样仅仅只使用到了 amis 不到 50% 的功能。amis 的自定义扩展功能，也非常强大，如果能完整学会amis，并灵活运用，能够极大的提高效率。

amis 功能多，迭代更新快，配置项数不胜数，文档描述有时模棱两可。这造成了开发者，在使用上的老是出现各种问题。要么是不理解某个属性有什么功效，要么就是以前好好的功能升级之后不能用了，等等...。 

因此，该项目主要是帮助更多amis初学者，快速入门amis的一些进阶功能，以及快速定位在使用amis上遇到的问题。

此外，官方 issue 1K+。很多反馈的bug，都存在描述不清晰，无法提供最小复现demo等问题。

### 该项目主要适用哪场景？

1. 一个只会使用 amisEditor 配置 amisJson 的初学者，想要接触一些 amis 进阶功能时。
2. 对某个组件的各种属性组合（或者一个新组件），不知道怎么用需要来回配置尝试时。
3. 需要使用 自定义filter，自定义rule，自定义组件，写 demo 尝试时。
4. 当发现一个 amis BUG 时，想向 amis官方提供一个最小复现demo 时。
5. 当需要分享一个 amis 最小功能时。（比如，一个初学者提出了使用上的问题，其他开发者可以将代码写好之后进行分享）

...等等其他场景

### 该项目不适合哪些场景？

1. 建立一个完整的 amis 项目。如果想要开发一个完整项目还是需要，使用桌面端编辑器，新建项目进行编辑。比如： "vscode" 。


### FAQ：

1. 为什么不用 codeSandbox,stackblitz 等更强大的工具来实现类似的需求？

这类工具都是大而全的在线代码编辑器，很强大。如果仅用来写 aims demo ，不但没有针对性，而且还有点大材小用。假设有非常多的小 demo 的情况下，也会有打开太慢的问题。

## 项目实现参考

- [amis-playground](https://github.com/fewismuch/amis-playground)
- [code-kitchen](https://github.com/freewheel/code-kitchen)