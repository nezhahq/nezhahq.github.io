---
outline: deep
---

## 站点标题

你可以在此项中自定义站点标题
<br/>

## 管理员列表
+ 如果你修改了自己的 Github, Gitlab 或 Gitee 的用户名，需要在此项中同步修改，否则无法登录，多个用户请用逗号隔开: `user1,user2`  

+ 如需更改管理员账户，请前往 `/opt/nezha/dashboard/data/config.yaml` ，重新设置新的管理员 `Client ID` 和 `Client Secret` 
<br/>

## 界面主题
在这里选择前台和后台界面主题，如果选项中没有某个已存在的主题，请更新面板  
启用 Custom 主题前，你需要在提前安装自定义主题，否则启用该项后，面板将无法正常显示
<br/>

## Language
哪吒监控目前支持以下语言：  

+ 简体中文
+ 繁體中文
+ English
+ Español
 
我们欢迎您对翻译进行勘误或贡献更多语言
<br/>

## 自定义代码  
可以在此修改 LOGO、修改色调、添加美化代码和统计代码等。

:::warning 
自定义代码仅在游客首页生效，管理面板不生效  
由于不同主题的代码不同，如确需修改管理面板中的内容，请修改 Docker 中的主题文件
:::
<br/>

#### 默认主题更改进度条颜色示例

  ```html
  <style>
  .ui.fine.progress> .bar {
      background-color: pink !important;
  }
  </style>
  ```

#### DayNight 主题更改进度条颜色、修改页脚示例（来自 [@hyt-allen-xu](https://github.com/hyt-allen-xu)  [@tech-fever](https://github.com/tech-fever)）

  ```html
  <style>
  .ui.fine.progress> .progress-bar {
    background-color: #00a7d0 !important;
  }
  </style>
  
  <script>
  window.onload = function(){
  var avatar=document.querySelector("img")
  var footer=document.querySelector("div.footer-container")
  footer.innerHTML="©2021 你的名字 & Powered by 你的名字"
  footer.style.visibility="visible"
  avatar.src="你的图片连接"
  avatar.style.visibility="visible"
}
  </script>
  ```

#### 默认主题修改 LOGO、修改页脚示例（来自 [@iLay1678](https://github.com/iLay1678)）

  ```html
  <style>
  .right.menu>a{
  visibility: hidden;
  }
  .footer .is-size-7{
  visibility: hidden;
  }
  .item img{
  visibility: hidden;
  }
  </style>
  <script>
  window.onload = function(){
  var avatar=document.querySelector(".item img")
  var footer=document.querySelector("div.is-size-7")
  footer.innerHTML="Powered by 你的名字"
  footer.style.visibility="visible"
  avatar.src="你的方形logo地址"
  avatar.style.visibility="visible"
  }
  </script>
  ```

#### hotaru 主题更改背景图片示例

  ```html
  <style>
  .hotaru-cover {
     background: url(https://s3.ax1x.com/2020/12/08/DzHv6A.jpg) center;
  }
  </style>
  ```
## 前台查看密码
如果你不想向游客直接展示你的主页，你可以在这里设置一个查看密码  
设置密码后，需要输入密码才可以访问主页  
<br/>

## 未接入 CDN 的面板服务器域名/IP
此项设置是使用一键脚本安装 Agent 的前提，详情请查看[这里](/guide/agent.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
<br/>

## IP 变更提醒
如果你希望当某个服务器的ip发生变更时收到通知，可以在这里进行设置  
#### 覆盖范围  
在这里选择一条规则，来确定需要监控哪些服务器，可以根据自己的需求进行选择  
#### 特定服务器
配合覆盖范围的设置，在这里设置选定规则的排除项
#### 提醒发送至指定的通知分组
选择通知方式，通知方式请提前在 “告警” 页内设置  
<br/>
:::warning 
**设置完成后，勾选启用时，通知生效**
:::
<br/>   

#### 通知中显示完整 IP 地址   
IP 变更通知默认隐藏完整 IP，如果你不希望隐藏，可以勾选 “通知信息中显示完整 IP 地址”

## 禁止前台切换模版
主页允许修改显示主题的功能默认启用，此功能只会影响单一用户，不会影响管理员在后台设置的启用主题
如果你不希望前台用户切换主题，可以勾选此项