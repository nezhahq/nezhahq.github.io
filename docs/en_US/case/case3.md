# Build your own server status query Telegram bot

::: info
This is an archived community project page. Compatibility with the current Nezha version is not verified. Check the upstream repository status and confirm that its API Token usage and API calls match your Nezha version before using it.
:::

Contributor: 
+ [tech-fever](https://github.com/tech-fever)

GitHub project: [nezha_telegram_bot](https://github.com/tech-fever/nezha_telegram_bot)（English is already supported）  

## Features

- [x] Support Chinese/English multi-language switch
- [x] Support tag statistics (CPU, disk, memory, upstream and downstream speed, traffic statistics, etc.)
- [x] Support real-time refresh of single server data
- [x] Support keyboard interactive query
- [x] Support query by command
- [x] Support adding bot to group, privacy protection of bot replies in group chat
- [x] Support bot messages automatic deletion in group chat within 20 seconds
- [x] Support docker deployment

## Commands list

Command | Description | Private chat only
--- | --- | ---
start | Getting started with the keyboard main menu | ✔️
help | help message | ❌
add | Add Nezha monitoring url link and token | ✔️
url | Add Nezha monitoring url link | ✔️
token | Add Nezha monitoring token | ✔️
info | Get saved Nezha monitoring url link and token | ✔️
delete | Delete saved Nezha monitoring url link and token | ✔️
id | Add an integer id after the command to query the information of a single server (refresh button only available in private chat) | ❌
all | Query statistics for all servers | ❌
search | Search for keywords in server names (multiple keywords supported, split by spaces) | ❌
