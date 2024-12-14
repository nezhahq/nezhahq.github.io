---
outline: deep
---

# API 文档

Nezha Dashboard 提供了丰富的 API 文档，开发者可以基于这些 API 构建自定义应用，例如自定义前端界面、机器人等。

---

## 使用说明

### 获取和生成文档

1. **克隆代码仓库**  
   从官方仓库克隆代码：  
   ```bash
   git clone https://github.com/nezhahq/nezha.git
   cd nezha
   ```

2. **运行文档生成脚本**  
   执行以下脚本以生成 API 文档所需的相关文件：  
   ```bash
   ./script/bootstrap.sh
   ```

3. **编译代码**  
   如果在编译过程中提示 `admin-dist` 或 `user-dist` 文件夹不存在，可以通过创建空文件夹解决：  
   ```bash
   mkdir -p dashboard/admin-dist dashboard/user-dist
   ```

4. **启用 Debug 模式**  
   修改配置文件，启用 Debug 模式并运行 `dashboard`   
   系统日志会自动输出 API 文档的访问地址。

