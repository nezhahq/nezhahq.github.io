# API 文档

哪吒面板提供了自带的 API 文档，可以根据 API 进行应用开发，例如自定义前端及机器人等。

## 使用说明

1. clone `https://github.com/nezhahq/nezha.git` 的 master 分支
2. 运行 `./script/bootstrap.sh`，生成文档相关文件。
3. 编译，可能会提示 `admin-dist` 和 `user-dist` 不存在的情况，可以通过创建一个空文件解决。
4. 配置文件启用 debug 运行 `dashboard`，日志会自动输出文档地址。
