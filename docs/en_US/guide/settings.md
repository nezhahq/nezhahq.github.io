## Site Title
You can customize your site title here  
<br/>

## Admin List
+ If you have changed your Github, Gitlab, Jihulab, Gitee username, you can change it in this item, otherwise you can't log in, please separate multiple users with commas: `user1,user2`  

+ To change your administrator account, please go to `/opt/nezha/dashboard/data/config.yaml` to set the new administrator `Client ID` and `Client Secret`.   
<br/>  

## Theme
Select the home page theme here, and update the panel if there is not an existing theme in the options  
<br/>

## Language
Nezha Monitoring currently supports the following languages:  

+ 简体中文
+ English
+ Español

[![Crowdin](https://badges.crowdin.net/nezha/localized.svg)](https://crowdin.com/project/nezha)  
We welcome corrections to translations and contributions of additional languages  
<br/>

## Custom code (style, script)  
Change logo, change color tone, add statistics code, etc.  

:::warning   
The custom code only takes effect in the visitor's home page, not in the admin panel.    
Since the code of different themes is different, if you really need to modify the content of the admin panel, please enter Docker to changes it by yourself.
:::
<br/>

#### Example of changing the default theme progress bar color  

  ```html
  <style>
  .ui.fine.progress> .bar {
      background-color: pink !important;
  }
  </style>
  ```

#### Example of modifying DayNight theme progress bar color and footer (by [@hyt-allen-xu](https://github.com/hyt-allen-xu) [@tech-fever](https://github.com/tech-fever))  

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
  footer.innerHTML="©2021 YourName & Powered by YourName"
  footer.style.visibility="visible"
  avatar.src="Logo URL"
  avatar.style.visibility="visible"
}
  </script>
  ```

#### Example of modifying the logo of the default theme, modifying the footer (by [@iLay1678](https://github.com/iLay1678))  

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
  footer.innerHTML="Powered by YOUR NAME"
  footer.style.visibility="visible"
  avatar.src="Your square logo link"
  avatar.style.visibility="visible"
  }
  </script>
  ```

#### Example of modifying the background image of hotaru theme

  ```html
  <style>
  .hotaru-cover {
     background: url(https://s3.ax1x.com/2020/12/08/DzHv6A.jpg) center;
  }
  </style>
  ```
## Access Password  
If you don't want to show your homepage directly, you can set a access password here  
After setting the password, you need to enter the password to access the homepage  
<br/>

## CDN Bypassed Domain/IP
This setting is a prerequisite for using the one-click script to install the Agent, see [here](/en_US/guide/agent.html#preparation) for details 
<br/>

## IP Change Alert
If you want to be notified when a server's ip changes, you can set it up here    
#### Coverage  
Select a rule here to determine which servers need to be monitored, and you can choose according to your needs    
#### Specific Servers
In conjunction with the coverage settings, set the exclusions for the selected rule here  
#### Send Notification To Specific Notification Group
Select the notification method, please set the notification method in the "Notifications" page    
<br/>
:::warning 
**When the settings are completed, the notification takes effect when `enabled` is activated**
:::
<br/>

:::warning 
IP Change Alert does not show ip by default, if you don't want to hide it, you can activate "Do NOT desensitize Server IP In Notification Messages"
:::
