**In the task area, you can set up scheduled tasks, Trigger tasks, and multi-server batch execution tasks**   

Nezha monitoring supports pushing commands to the Agent for execution, so this feature is very flexible and can be used to periodically back up the server in conjunction with restic, rclone. Periodically restart a service to reset the network connection. It can also be used with notifications to perform a task when a notification is triggered, such as running a script when the CPU is at high occupancy for a long period of time.

## How to use
Go to the "Tasks" page of the admin panel and click "Add Scheduled Task"    
To add a scheduled task you need to make the following settings:    
+ `Name` - Customize a task name  

+ `Task Type` - select the type of task  
Scheduled Tasks - Tasks are executed periodically at the scheduled time set below  
Trigger Tasks - Tasks that are triggered only by API or notification rules and are executed once per trigger

+ `Cron Expression` - (Not valid when using the trigger task type) Set schedule time, the Cron Expression is like:： `* * * * * *`  `sec min hour day month week`, see details in [CRON Expression Format](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-CRON_Expression_Format)  
For example: `0 0 3 * * *` is `Every day at 3 o'clock`

+ `Command` - Just like writing shell/bat scripts, **but line wrap is not recommended**, **Multiple Commands should be connected with `&&/&`**  
For example, to execute a periodic reboot command, you can type `reboot` here  

+ `Coverage` and `Specific Servers` - Similar to the settings on the Services page, select rules to determine which Agents need to execute scheduled tasks  
When using the trigger task type, you can select `Only servers that are included in the notification rule`

+ `Notification Group` - Select the notification method you have set up on the "Notification" page. [Click here](/en_US/guide/notifications.html#flexible-notification-methods) for more information

+ `Send Success Notification` - When this item is activated, a message notification will be triggered when the task is successfully executed    
<br/>

## Manage tasks  
To manage existing scheduled tasks, you can go to the "Tasks" page in the administration panel  
Select a task configuration and the three icons on the right, which are:  
+ `Execute Now` - When clicked, the scheduled time will be ignored and the task will be executed immediately    
+ `Edit` - Click to modify the task configuration  
+ `Delete` - Delete this scheduled task  
<br/>

## FAQ
1. Command not found  
Command not found may cause by missing PATH environment variable, for Linux Server, you may try adding `source ~/.bashrc` at beginning of your command or execute by absolute path.