## 多语言
哪吒监控目前支持以下语言：  

+ 简体中文
+ English
+ Español

[![Crowdin](https://badges.crowdin.net/nezha/localized.svg)](https://crowdin.com/project/nezha)  
我们欢迎您贡献更多语言
<br/>

## 自定义代码  
改LOGO、改色调、加统计代码等。

:::warning 
自定义代码仅在游客首页生效。
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

#### DayNight 主题更改进度条颜色、修改页脚示例（来自 [@hyt-allen-xu](https://github.com/hyt-allen-xu)）

  ```html
  <style>
  .ui.fine.progress> .progress-bar {
    background-color: #00a7d0 !important;
  }
  </style>
  <script>
  window.onload = function(){
  var footer=document.querySelector("div.footer-container")
  footer.innerHTML="©2021 你的名字 & Powered by 你的名字"
  footer.style.visibility="visible"
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
