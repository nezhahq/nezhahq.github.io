## Nezha Theme Development Environment

Nezha Monitoring provides a theme development environment that you can use to create new Nezha Monitoring themes

::: warning 
Please note: This development environment only supports `dashboard v0.13.16` and newer versions.  
:::
## How to use

1. Clone [this repository](https://github.com/nezhahq/skeleton-custom-theme) to local
2. Modify the Oauth2 configuration in `data/config.yaml`（The callback connection can be filled with `http://localhost`）
3. Run `docker-compose up`
4. Start development
5. Once the theme has been created, you can place `theme-custom` in `/opt/nezha/dashboard/theme-custom` on the server

## FAQ

- If you can't use port `80`, change the configuration in `docker-compose.yaml`.
