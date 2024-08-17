# nezha-agent-rs: 低性能设备专用 Agent

[Github 仓库](https://github.com/GenshinMinecraft/nezha-agent-rs)

由 Rust 编写的 **轻量级、高性能、低占用** 哪吒面板 Agent

目前仅实现了主页面板的监控功能，如 Task、终端等尚未适配 (或者不会适配，保持轻量级别)

## 使用

使用方法与官方 Nezha Agent 无异，请使用 `--help` 查看帮助信息:

```
Nezha Agent

Usage: nezha-agent-rs [OPTIONS] --server <SERVER> --password <PASSWORD>

Options:
  -s, --server <SERVER>      Frontend Server Address
  -p, --password <PASSWORD>  Token Setting
      --debug                Enable Debug Log
  -h, --help                 Print help
  -V, --version              Print version
```

基础使用仅需 `./nezha-agent-rs -s [服务器地址:端口] -p [连接密钥]`

请前往本项目 [Action](https://github.com/GenshinMinecraft/nezha-agent-rs/actions) 获取 Release 构建文件，不会存放至 Release 页面，请自行下载

如果你的系统是基于 Glibc 的，可以选择带有 `gnu` 字样的构建文件下载

如果你的系统不是基于 Glibc 的 (如 Alpine, Openwrt 等)，请务必选择 带有`musl` 字样的构建文件下载

任何系统均可运行带有 `musl` 字样的构建文件，区别仅为 Glibc 占用相对较小

本项目不会长期维护，仅作为本人学习 Rust 的练手项目，如无特殊要求请使用[官方 Nezha Agent](https://github.com/nezhahq/agent)

## 鸣谢

- [Nezha](https://github.com/naiba/nezha): 感谢奶爸开发了如此好用的面板
- [JetBrains](https://www.jetbrains.com/): 感谢 JetBrains 提供的 RustRover IDE

## 协议

本项目根据 WTFPL (Do What The Fuck You Want To Public License, 你他妈的想干嘛就干嘛公共许可证) 发布

```license
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004
 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
  0. You just DO WHAT THE FUCK YOU WANT TO.
```

## 贡献

如果你想为该项目做贡献，请前往 [Github 仓库](https://github.com/GenshinMinecraft/nezha-agent-rs)开启 PR
