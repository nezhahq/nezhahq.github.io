---
outline: deep
---

# Settings

## Site Title

You can customize the site title in this section.

## Administrator List

- If you have changed your Github, Gitlab, or Gitee username, you need to update it here to avoid login issues. Separate multiple usernames with commas: `user1,user2`.
- To change the administrator account, go to `/opt/nezha/dashboard/data/config.yaml` and reset the new administrator `Client ID` and `Client Secret`.

## Theme

Select the theme for the frontend and dashboard here. If a theme that already exists is not in the options, update the Dashboard. 

To use a custom frontend theme, you need to create a theme description file. For more information on custom themes, please refer to [Nezha Theme Development Environment](/en_US/developer/theme.html).

Before enabling the dashboard Custom theme, ensure you have installed the custom theme; otherwise, the Dashboard will not display correctly after enabling this option.

## Language

Nezha Monitoring currently supports the following languages:

- Simplified Chinese (简体中文)
- Traditional Chinese (繁體中文)
- English
- Spanish (Español)

We welcome corrections to translations or contributions of more languages.

## Custom Code (style, script)

You can modify the LOGO, adjust colors, add beautification code, and add statistical code here.

:::warning 
Custom code only affects the visitor homepage, not the admin panel. Due to differences in code between themes, if you need to modify the content in the admin panel, please modify the theme files in Docker.
:::

#### Example of Changing Progress Bar Color, Background Image, Navigation Bar, etc., in the Default Theme

<details>
  <summary>Click to expand/collapse</summary>

  ```html
  <style>
  /* Screen adaptation */
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

  /* Overall icons */
  i.icon {
      color: #000;
      width: 1.2em !important;
  }

  /* Background image */
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

  /* Navigation bar */
  .ui.large.menu {
      border: 0 !important;
      border-radius: 0px !important;
      background-color: rgba(255, 255, 255, 55%) !important;
  }

  /* Homepage buttons */
  .ui.menu .active.item {
      background-color: transparent !important;
  }

  /* Navigation bar dropdown */
  .ui.dropdown .menu {
      border: 0 !important;
      border-radius: 0 !important;
      background-color: rgba(255, 255, 255, 80%) !important;
  }

  /* Login button */
  .nezha-primary-btn {
      background-color: transparent !important;
      color: #000 !important;
  }

  /* Large card */
  #app .ui.fluid.accordion {
      background-color: #fbfbfb26 !important;
      border-radius: 0.4rem !important;
  }

  /* Small card */
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

  /* Server name */
  .status.cards .flag {
      margin-right: 0.5rem !important;
  }

  /* Popup card icon */
  .status.cards .header > .info.icon {
      margin-right: 0 !important;
  }

  .nezha-secondary-font {
      color: #2175ba !important;
  }

  /* Upload/download */
  .status.cards .outline.icon {
      margin-right: 1px !important;
  }

  i.arrow.alternate.circle.down.outline.icon {
      color: #2175ba !important;
  }

  i.arrow.alternate.circle.up.outline.icon {
      color: red !important;
  }

  /* Popup card small arrow */
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
      border-color: #fafafaeb transparent transparent !重要;
      background: #fafafaeb !重要
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !重要;
  }

  .ui.top.left.popup:before {
      border-radius: 0 !重要;
      border: 1px solid transparent !重要;
      border-color: #fafafaeb transparent transparent !重要;
      background: #fafafaeb !重要;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !重要;
  }

  .ui.top.right.popup:before {
      border-radius: 0 !重要;
      border: 1px solid transparent !重要;
      border-color: #fafafaeb transparent transparent !重要;
      background: #fafafaeb !重要;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !重要;
  }

  .ui.left.center.popup:before {
      border-radius: 0 !重要;
      border: 1px solid transparent !重要;
      border-color: #fafafaeb transparent transparent !重要;
      background: #fafafaeb !重要;
      -webkit-box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      box-shadow: 0px 0px 0 0 #fafafaeb !重要;
      -webkit-tap-highlight-color: rgba(0,0,0,0) !重要;
  }

  /* Popup card */
  .status.cards .ui.content.popup {
      min-width: 20rem !重要;
      line-height: 2rem !重要;
      border-radius: 5px !重要;
      border: 1px solid transparent !重要;
      background-color: #fafafaeb !重要;
      font-family: Arial,Helvetica,sans-serif !重要;
  }

  .ui.content {
      margin: 0 !重要;
      padding: 1em !重要;
  }

  /* Service page */
  .ui

.table {
      background: RGB(225,225,225,0.6) !重要;
  }

  .ui.table thead th {
      background: transparent !重要;
  }

  /* Service page progress bar */
  .service-status .good {
      background-color: #2175ba !重要;
  }

  .service-status .danger {
      background-color: red !重要;
  }

  .service-status .warning {
      background-color: orange !重要;
  }

  /* Copyright */
  .ui.inverted.segment, .ui.primary.inverted.segment {
      color: #000 !重要;
      font-weight: bold !重要;
      background-color: #fafafaa3 !重要;
  }
  </style>

  <!--Logo and Copyright-->
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

#### Example of Changing Progress Bar Color and Modifying Footer in DayNight Theme (by [@hyt-allen-xu](https://github.com/hyt-allen-xu) and [@tech-fever](https://github.com/tech-fever))

<details>
  <summary>Click to expand/collapse</summary>

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
    footer.innerHTML = "©2021 Your Name & Powered by Your Name";
    footer.style.visibility = "visible";
    avatar.src = "Your Image URL";
    avatar.style.visibility = "visible";
  }
  </script>
  ```
</details>

#### Example of Changing LOGO and Footer in Default Theme (by [@iLay1678](https://github.com/iLay1678))

<details>
  <summary>Click to expand/collapse</summary>

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
    footer.innerHTML = "Powered by Your Name";
    footer.style.visibility = "visible";
    avatar.src = "Your Square Logo URL";
    avatar.style.visibility = "visible";
  }
  </script>
  ```
</details>

#### Example of Changing Background Image in Hotaru Theme

<details>
  <summary>Click to expand/collapse</summary>

  ```html
  <style>
  .hotaru-cover {
     background: url(https://s3.ax1x.com/2020/12/08/DzHv6A.jpg) center;
  }
  </style>
  ```
</details>

## View Password

If you don't want to display your Dashboard directly to visitors, you can set a view password here. After setting the password, visitors need to enter the password to access the homepage.

## Non-CDN Dashboard Server Domain/IP

This setting is a prerequisite for using the one-click script to install the Agent. For details, please see [here](/en_US/guide/agent.html#preparation).

## IP Change Notifications

If you want to receive notifications when a server's IP changes, you can set it up here.

#### Coverage

Select a rule to determine which servers to monitor. Choose according to your needs.

#### Specific Servers

Set exclusions for the selected rule in conjunction with the coverage scope.

#### Send Notifications to a Specific Notification Group

Choose a notification method, which should be set up in advance on the "Notification" page.

:::warning 
**Notifications take effect after enabling this setting.**
:::

#### Show Full IP Address in Notifications

IP change notifications hide the full IP by default. If you don't want to hide it, check "Show Full IP Address in Notification."

## Disable Homepage Theme Switching

By default, the Dashboard allows visitors to change the theme. This feature only affects individual visitors and does not affect the theme set by the administrator in the admin panel. If you don't want visitors to switch themes, check this option.