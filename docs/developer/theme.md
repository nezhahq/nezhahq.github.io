# 哪吒主题开发环境

哪吒面板提供了主题开发环境，你可以使用它来创建新的哪吒监控主题

::: warning 
请注意： 此开发环境仅支持 `dashboard v0.19.11` 及更新版本。
:::
## 使用说明

1. 克隆[此仓库](https://github.com/nezhahq/skeleton-custom-theme)到本地
2. 修改 `data/config.yaml` 中的 Oauth2 配置（回调连接可以填 `http://localhost`）
3. 运行 `docker-compose up`
4. 开始开发
5. 主题制作完成之后可以将 `theme-custom`(前台主题)、`static-custom`(前台主题静态文件) 和 `dashboard-custom`(后台主题) 放置到服务器上的 `/opt/nezha/dashboard/` 中（如使用 Docker 安装）

## FAQ

- 如果不能使用 `80` 端口，在 `docker-compose.yaml` 中修改配置。
