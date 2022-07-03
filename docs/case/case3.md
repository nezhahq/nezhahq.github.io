# 自建使用 API 来进行查询,且支持多语言的 Telegram 查询机器人
贡献者:  
+ [tech-fever](https://github.com/tech-fever)

项目地址：[nezha_telegram_bot](https://github.com/tech-fever/nezha_telegram_bot)


## 项目特色
开源Telegram机器人项目，可以基于API实时查询哪吒面板的服务器信息。

- [x] 支持中/英多语言切换
- [x] 支持分组统计(CPU、磁盘、内存、上下行速度、流量统计等)
- [x] 支持实时刷新单个服务器数据
- [x] 支持键盘互动查询
- [x] 支持命令直接查询
- [x] 增加群聊判断，限制群聊可发送命令
- [x] 增加群聊内5秒自动删除信息
- [x] 支持docker部署

## 命令列表
| 命令 | 功能 | 仅私聊 |
| --- | --- | --- |
| start | 开始使用键盘主菜单 | ✔️ |
| help | 帮助列表 | ❌ |
| add | 添加面板链接和token | ✔️ |
| url | 添加面板链接 | ✔️ |
| token | 添加面板token | ✔️ |
| info | 获取保存的面板链接和token | ✔️ |
| delete | 删除保存的面板链接和token | ✔️ |
| id | 命令后面添加整数id，来进行单个服务器信息查询（私聊带刷新按钮，群聊不带） | ❌ |
| all | 查询所有服务器的统计信息 | ❌ |
| search | 在服务器名字中搜索关键字（支持多个，用空格分开） | ❌ |

## 效果展示
![image](https://user-images.githubusercontent.com/105153585/175813727-bef77a8e-ff46-4fd4-b41b-43902abf6159.png#pic_left)
![image](https://user-images.githubusercontent.com/105153585/175813645-4df4f4c7-2591-4133-9645-21c7db2f62ab.png#pic_right)
