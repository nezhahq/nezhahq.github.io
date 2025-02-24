---
outline: deep
---

# 快速开始

本文档将引导您一步步构建开发环境, 并让您能够快速参与到 NeZha 的开发中来.

首先 fork 一下 nezha 的仓库用于保存修改, 接下来您可以选择使用容器开发或在本地开发, 为了让您能更快速的开始开发,本文先介绍容器开发.

## 容器开发环境

在 VSCode 中使用容器开发需要安装 `ms-vscode-remote.remote-containers` 插件

### Github Codespaces

在你 fork 后的仓库中, 点击仓库右上角的 `Code` -> `Codespaces` -> `Create codespace on master` 来快速创建一个云端开发环境, 等待环境构建完成.

你也可以在 VSCode 或其他支持的 IDE 中安装 `GitHub.codespaces` 插件后直接连接

### 远程容器开发

如果你有一台专用的开发服务器, 上面有 Docker 或其兼容程序, 那么你可以通过 SSH 创建并构建远程开发容器并在远程服务器上进行开发, 此处以 VSCode 举例:

1. 配置你的 `~/.ssh/config`(*nux) 或 `%HOMEPATH%/.ssh/config`(Windows) 文件, 下面是一个简单的示例:
   ```
   Host Dev
     HostName dev.server.host
     User <你的用户名>
     IdentityFile <你的私钥路径>
   ```
2. 使用 SSH 登陆远程服务器. 如果你正确配置了第一步, 此时可以用命令 `ssh Dev` 来测试
3. 在服务器上克隆仓库: `git clone <你 fork 后的仓库地址>`
4. 打开 VSCode 左侧栏的远程资源管理器, 需要安装 `remote` 系列的官方插件
5. 使用 VSCode 打开你 clone 后的目录
6. 按下 `F1` 在弹出的对话框中键入并选择 `Dev Containers: Rebuild and Reopen in Container`
7. 等待开发环境构建完成

### 本地容器开发

如果你机器本地有 Docker 或其兼容程序, 那么你可以在本地创建并构建开发容器, 通常你会遇到网络问题, 请自行解决, 此处以 VSCode 举例:

1. 克隆仓库.
   使用命令: `git clone <你 fork 后的仓库地址>`
2. 使用 VSCode 打开你 clone 后的目录
3. 按下 `F1` 在弹出的对话框中键入并选择 `Dev Containers: Rebuild and Reopen in Container`
4. 等待开发环境构建完成

## 开始开发

在完成环境的自动构建后 Nezha 默认处于能随时编译的状态, 你可以开始自由编辑后运行 `.devcontainer/build.sh` 进行编译测试.

### 阅读文档

你可可以查阅[API 文档](./api.md)来了解 NeZha 提供了哪些 WebAPI 以供调用.

如果你使用上面提供的容器开发环境之一, 那么这些文件均已构建完毕, 存储在开发环境的 `cmd/dashboard/docs` 目录下
