---
outline: deep
---

# 登录常见问题
*V0版本，不适用于V1版本*   

## 登录后面板报错

### 1. `http: named cookie not present`

可能原因及解决方法：
1. 清理浏览器的 cookies 后重新登录，或者尝试更换浏览器。
2. 检查回调地址配置，确保回调地址正确且 **端口与协议一致**。  
   - 发起请求的地址和回调地址需同域，**协议、端口和域名（或 IP）** 都必须一致。

---

### 2. `lookup xxx`

此问题通常由于容器的 DNS 解析失败，可能原因包括 iptables 配置被修改。解决方法：
1. 重启 Docker 服务：
   ```bash
   sudo systemctl restart docker
   ```
2. 使用脚本重启面板后查看是否恢复正常。
3. 如果问题依然存在：
   - 检查是否有其他工具（如宝塔防火墙）控制了 iptables。
   - 考虑切换到官方内核，因为某些问题可能与当前内核版本相关。

---

### 3. `dial tcp xxx:443 i/o timeout`

此问题通常与网络问题有关。解决方法：
1. 重启 Docker 服务：
   ```bash
   sudo systemctl restart docker
   ```
2. 使用脚本重启面板后查看是否恢复正常。
3. 如果您使用国内服务器并配置了 GitHub 登录方式：
   - 建议切换到 **Cloudflare Access** 以减少网络干扰。

---

### 4. `net/http: TLS handshake timeout`

此问题与网络问题类似，处理方式与上文相同：
1. 重启 Docker 服务：
   ```bash
   sudo systemctl restart docker
   ```
2. 使用脚本重启面板后检查是否正常。
