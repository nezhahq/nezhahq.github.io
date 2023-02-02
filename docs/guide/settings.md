## 站点标题
你可以在此项中自定义你的站点标题
<br/>

## 管理员列表
+ 如果你修改了自己的 Github, Gitlab, Jihulab 或 Gitee 的用户名，可以在此项中同步修改，否则无法登录，多个用户请用逗号隔开: `user1,user2`  

+ 如需更改管理员账户，请前往 `/opt/nezha/dashboard/data/config.yaml` ，重新设置新的管理员 `Client ID` 和 `Client Secret` 
<br/>

## 主题
在这里选择主页主题，如果选项中没有某个已存在的主题，请更新面板
<br/>

## Language
哪吒监控目前支持以下语言：  

+ 简体中文
+ English
+ Español

[![Crowdin](https://badges.crowdin.net/nezha/localized.svg)](https://crowdin.com/project/nezha)  
我们欢迎您对翻译进行勘误和贡献更多语言
<br/>

## 自定义代码  
改 LOGO、改色调、加统计代码等。

:::warning 
自定义代码仅在游客首页生效，管理面板不生效  
由于不同主题的代码不同，如确需修改管理面板中的内容，请自行前往 Docker 中研究修改
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
如果你不想直接展示你的主页，你可以在这里设置一个查看密码  
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
选择通知方式，通知方式请提前在 “报警” 页内设置  
<br/>
:::warning 
**设置完成后，勾选启用时，通知生效**
:::
<br/>

:::warning 
IP变更通知默认打码，如果你不希望打码，可以勾选 “通知信息IP不打码”
:::
