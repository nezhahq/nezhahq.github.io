---
outline: deep
---

## 站点标题

你可以在此项中自定义站点标题。

## 管理员列表

- 如果你修改了自己的 Github、Gitlab 或 Gitee 的用户名，需要在此项中同步修改，否则无法登录。多个用户请用逗号隔开：`user1,user2`。
- 如需更改管理员账户，请前往 `/opt/nezha/dashboard/data/config.yaml`，重新设置新的管理员 `Client ID` 和 `Client Secret`。

## 界面主题

在这里选择主页和管理界面主题，如果选项中没有某个已存在的主题，请更新面板。  
启用 Custom 主题前，你需要提前安装自定义主题，否则启用该项后，面板将无法正常显示。

## Language

哪吒监控目前支持以下语言：

- 简体中文
- 繁體中文
- English
- Español

我们欢迎您对翻译进行勘误或贡献更多语言。

## 自定义代码 (style, script)

可以在此修改 LOGO、修改色调、添加美化代码和统计代码等。

:::warning 
自定义代码仅在游客首页生效，管理面板不生效。由于不同主题的代码不同，如确需修改管理面板中的内容，请修改 Docker 中的主题文件。
:::

#### 默认主题更改进度条颜色、背景图片、导航栏等效果示例

<details>
  <summary>点击展开/收起</summary>

  ```html
  <style>
  /* 屏幕适配 */
  @media only screen and (min-width: 1200px) {
      .ui.container {
      width: 80% !important;
  }
  }

  @media only screen and (max-width: 767px) {
      .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
          margin-top: 0.4em !important;
      }
  }

  /* 整体图标 */
  i.icon {
      color: #000;
      width: 1.2em !important;
  }

  /* 背景图片 */
  body {
      content: " " !important;
      background: fixed !important;
      z-index: -1 !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      background-position: top !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-image: url(https://backgroud.img) !important;
      font-family: Arial,Helvetica,sans-serif !important;
  }

  /* 导航栏 */
  .ui.large.menu {
      border: 0 !important;
      border-radius: 0px !important;
      background-color: rgba(255, 255, 255, 55%) !important;
  }

  /* 首页按钮 */
  .ui.menu .active.item {
      background-color: transparent !important;
  }

  /* 导航栏下拉框 */
  .ui.dropdown .menu {
      border: 0 !important;
      border-radius: 0 !important;
      background-color: rgba(255, 255, 255, 80%) !important;
  }

  /* 登录按钮 */
  .nezha-primary-btn {
      background-color: transparent !important;
      color: #000 !important;
  }

  /* 大卡片 */
  #app .ui.fluid.accordion {
      background-color: #fbfbfb26 !important;
      border-radius: 0.4rem !important;
  }

  /* 小卡片 */
  .ui.four.cards>.card {
      border-radius: 0.6rem !important;
      background-color: #fafafaa3 !important;
  }

  .status.cards .wide.column {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      height: 3.3rem !important;
  }

  .status.cards .three.wide.column {
      padding-right: 0rem !important;
  }

  .status.cards .wide.column:nth-child(1) {
      margin-top: 2rem !important;
  }

  .status.cards .wide.column:nth-child(2) {
      margin-top: 2rem !important;
  }

  .status.cards .description {
      padding-bottom: 0 !important;
  }

  /* 服务器名 */
  .status.cards .flag {
      margin-right: 0.5rem !important;
  }

  /* 弹出卡片图标 */
  .status.cards .header > .info.icon {
      margin-right: 0 !important;
  }

  .nezha-secondary-font {
      color: #2175ba !important;
  }

  /* 上传下载 */
  .status.cards .outline.icon {
      margin-right: 1px !important;
  }

  i.arrow.alternate.circle.down.outline.icon {
      color: #2175ba !important;
  }

  i.arrow.alternate.circle.up.outline.icon {
      color: red !important;
  }

  /* 弹出卡片小箭头 */
  .ui.right.center.popup {
      margin: -3px 0 0 0.914286em !important;
      -webkit-transform-origin: left 50% !important;
      transform-origin: left 50% !important;
  }

  .ui.bottom.left.popup {
      margin-left: 1px !important;
      margin-top: 3px !important;
  }

  .ui.top.left.popup {
      margin-left: 0 !important;
      margin-bottom: 10px !important;
  }

  .ui.top.right.popup {
      margin-right: 0 !important;
      margin-bottom: 8px !important;
  }

  .ui.left.center.popup {
      margin: -3px .91428571em 0 0 !important;
      -webkit-transform-origin: right 50% !important;
      transform-origin: right 50% !important;
  }

  .ui.right.center.popup:before,
  .ui.left.center.popup:before {
      border: 0px solid #fafafaeb !important;
      background: #fafafaeb !important;
  }

  .ui.top.popup:before {
      border-color: #fafafaeb transparent transparent !important;
  }

  .ui.popup:before {
      border-color: #fafafaeb transparent transparent !important;
  }

  .ui.bottom.left.popup:before {
      border-radius: 0 !important;
      border: 1px solid transparent !important;
      border-color: #fafafaeb transparent transparent !important;
      background: #fafafaeb !important;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !important;
      box-shadow: 0px 0px 0 0 #fafafaeb !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  }

  .ui.bottom.right.popup:before {
      border-radius: 0 !important;
      border: 1px solid transparent !important;
      border-color: #fafafaeb transparent transparent !important;
      background: #fafafaeb !important
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !important;
      box-shadow: 0px 0px 0 0 #fafafaeb !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  }

  .ui.top.left.popup:before {
      border-radius: 0 !important;
      border: 1px solid transparent !important;
      border-color: #fafafaeb transparent transparent !important;
      background: #fafafaeb !important;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !important;
      box-shadow: 0px 0px 0 0 #fafafaeb !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  }

  .ui.top.right.popup:before {
      border-radius: 0 !important;
      border: 1px solid transparent !important;
      border-color: #fafafaeb transparent transparent !important;
      background: #fafafaeb !important;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !important;
      box-shadow: 0px 0px 0 0 #fafafaeb !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  }

  .ui.left.center.popup:before {
      border-radius: 0 !important;
      border: 1px solid transparent !important;
      border-color: #fafafaeb transparent transparent !important;
      background: #fafafaeb !important;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !important;
      box-shadow: 0px 0px 0 0 #fafafaeb !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  }

  /* 弹出卡片 */
  .status.cards .ui.content.popup {
      min-width: 20rem !important;
      line-height: 2rem !important;
      border-radius: 5px !important;
      border: 1px solid transparent !important;
      background-color: #fafafaeb !important;
      font-family: Arial,Helvetica,sans-serif !important;
  }

  .ui.content {
      margin: 0 !important;
      padding: 1em !important;
  }

  /* 服务页 */
  .ui.table {
      background: RGB(225,225,225,0.6) !important;
  }

  .ui.table thead th {
      background: transparent !important;
  }

  /* 服务页进度条 */
  .service-status .good {
      background-color: #2175ba !important;
  }

  .service-status .danger {
      background-color: red !important;
  }

  .service-status .warning {
      background-color: orange !important;
  }

  /* 版权 */
  .ui.inverted.segment, .ui.primary.inverted.segment {
      color: #000 !important;
      font-weight: bold !important;
      background-color: #fafafaa3 !important;
  }
  </style>

  <!--Logo和版权-->
  <script>
  window.onload = function(){
  var avatar=document.querySelector(".item img")
  var footer=document.querySelector("div.is-size-7")
  footer.innerHTML="Copyright info"
  footer.style.visibility="visible"
  avatar.src="https:/img.src"
  avatar.style.visibility="visible"
  }
  </script>
  ```
</details>

#### DayNight 主题更改进度条颜色、修改页脚示例（来自 [@hyt-allen-xu](https://github.com/hyt-allen-xu)  [@tech-fever](https://github.com/tech-fever)）

<details>
  <summary>点击展开/收起</summary>

  ```html
  <style>
  .ui.fine.progress> .progress-bar {
    background-color: #00a7d0 !important;
  }
  </style>
  
  <script>
  window.onload = function(){
    var avatar = document.querySelector("img");
    var footer = document.querySelector("div.footer-container");
    footer.innerHTML = "©2021 你的名字 & Powered by 你的名字";
    footer.style.visibility = "visible";
    avatar.src = "你的图片连接";
    avatar.style.visibility = "visible";
  }
  </script>
  ```
</details>

#### 默认主题修改 LOGO、修改页脚示例（来自 [@iLay1678](https://github.com/iLay1678)）

<details>
  <summary>点击展开/收起</summary>

  ```html
  <style>
  .right.menu>a {
    visibility: hidden;
  }
  .footer .is-size-7 {
    visibility: hidden;
  }
  .item img {
    visibility: hidden;
  }
  </style>
  <script>
  window.onload = function() {
    var avatar = document.querySelector(".item img");
    var footer = document.querySelector("div.is-size-7");
    footer.innerHTML = "Powered by 你的名字";
    footer.style.visibility = "visible";
    avatar.src = "你的方形 logo 地址";
    avatar.style.visibility = "visible";
  }
  </script>
  ```
</details>

#### hotaru 主题更改背景图片示例

<details>
  <summary>点击展开/收起</summary>

  ```html
  <style>
  .hotaru-cover {
     background: url(https://s3.ax1x.com/2020/12/08/DzHv6A.jpg) center;
  }
  </style>
  ```
</details>

## 前台查看密码

如果你不想向游客直接展示你的 Dashboard，可以在这里设置一个查看密码。设置密码后，需要输入密码才可以访问主页。

## 未接入 CDN 的面板服务器域名/IP

此项设置是使用一键脚本安装 Agent 的前提，详情请查看[这里](/guide/agent.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)。

## IP 变更提醒

如果你希望当某个服务器的 IP 发生变更时收到通知，可以在这里进行设置。

#### 覆盖范围

在这里选择一条规则，来确定需要监控哪些服务器，可以根据自己的需求进行选择。

#### 特定服务器

配合覆盖范围的设置，在这里设置选定规则的排除项。

#### 提醒发送至指定的通知分组

选择通知方式，通知方式请提前在“告警”页内设置。

:::warning 
**设置完成后，勾选启用时，通知生效**。
:::

#### 通知中显示完整 IP 地址

IP 变更通知默认隐藏完整 IP，如果你不希望隐藏，可以勾选“通知信息中显示完整 IP 地址”。

## 禁止前台切换模版

Dashboard 默认启用允许访客修改显示主题的功能，此功能只会影响单一访客，不会影响管理员在后台设置的启用主题。如果你不希望访客切换主题，可以勾选此项。