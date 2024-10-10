# Nezha Theme Development Environment

Nezha Monitoring provides a theme development environment that you can use to create new Nezha Monitoring themes

::: warning 
Please note: This development environment only supports `dashboard v0.19.20` and newer versions.  
:::
## How to use

1. Clone [this repository](https://github.com/nezhahq/skeleton-custom-theme) to local
2. Modify the Oauth2 configuration in `data/config.yaml`（The callback connection can be filled with `http://localhost`）
3. Run `docker-compose up`
4. Start development
5. After completing the theme creation, you can place `theme-custom` (frontend theme), `static-custom` (frontend theme static files), and `dashboard-custom` (backend theme) into the `/opt/nezha/dashboard/` directory on the server (if installed using Docker).

## FAQ

- If you can't use port `80`, change the configuration in `docker-compose.yaml`.
