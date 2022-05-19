# 主机
## 介绍
主机区域负责管理Agent，是哪吒探针中最基础的区域，也是其他功能的基础。

## 添加服务器
第一步是添加主机，可以自定义名称、分组、排序和备注。  
拥有相同分组的主机会在受支持的主题中划分到一起进行显示，备注仅会在后台显示，无需担心泄露信息。

## 安装Agent
请参考前文[安装Agent](/guide/agent.html)  
推荐使用一键安装，即**配置好参数后**，点击主机**一键安装**列上的按钮，复制到相应主机进行安装。

## 强制更新
强制更新对应的是[自定义agent监控项目](/guide/agent.html#自定义agent监控项目)中的--disable-auto-update和--disable-force-update。  
默认情况下，Agent会自动更新，无需干预。但当用户关闭自动更新后，也可以选中指定主机进行强制更新。  
disable-force-update开启时此功能不生效。

## 数据列
* 版本号: 记录Agent当前版本
* 密钥: 即secret\key，配置Agent时会用到
* 一键安装: 较为便捷的Agent安装方式
* 管理: 左为WebShell，中为编辑，右为删除

## 在线终端
即WebShell，disable-command-execute开启时此功能不生效。  
Linux和Windows均可用，可使用Ctrl+Shift+V粘贴。  
连接失败请参考[实时通道断开/在线终端连接失败](/guide/q4.html)。  
注意在线终端功能中，Agent也是通过WebSocket连接到**用户使用域名**，而非通过grpc交互。