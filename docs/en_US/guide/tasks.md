---
outline: deep
---

# Task Management

**In the Tasks section, you can set up scheduled tasks, trigger tasks, and batch execute tasks on multiple servers.**

Nezha Monitoring supports pushing commands to Agents for execution. This feature is highly flexible and can be used for regular backups using tools like restic or rclone, periodically restarting a service to reset network connections, or executing a task when an notification is triggered, such as running a script when CPU usage is high for an extended period.

## How to Use

Go to the "Tasks" page in the admin panel and click "Add Scheduled Task." When adding a scheduled task, you need to fill in the following parameters:

- **Name**: Customize a task name.

- **Task Type**: Choose the type of task.
  - **Scheduled Task**: Executes periodically according to the schedule set below.
  - **Trigger Task**: Only executed when triggered by an API call or notification rule, runs once per trigger.

- **Schedule**: Set the schedule time (not enable when using trigger task type). The time format is `* * * * * *`, corresponding to `second minute hour day month weekday`. For more details, see [Cron Expression Format](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-CRON_Expression_Format).  
For example: `0 0 3 * * *` means "3 AM every day."

- **Command**: Set the command to execute, similar to writing Shell/Bat scripts, but it's recommended not to use new lines; connect multiple commands with `&&` or `&`.  
For example, to schedule a reboot, you can enter `reboot` here.

- **Coverage** and **Specific Servers**: Select rules to determine which Agents execute the scheduled task, similar to the settings on the "Services" page. When using the trigger task type, you can choose "executed by the triggered server."

- **Notification Group**: Choose the notification methods you have set up on the "Notifications" page. [Click here](/en_US/guide/notifications.html#flexible-notification-methods) for more details.

- **Send Success Notification**: Check this option to trigger a notification upon successful task execution.

## Managing Tasks

To manage existing scheduled tasks, go to the "Tasks" page in the admin panel. For each task configuration, the three icons on the right are:

- **Execute Immediately**: Click to ignore the scheduled time and execute the task immediately.
- **Edit**: Click to modify the task configuration.
- **Delete**: Delete the scheduled task.

## Frequently Asked Questions

1. **Command not found error**  
   If a command fails to run with a "command not found" error, it may be a PATH environment variable issue. On Linux servers, you can add `source ~/.bashrc` at the beginning of the command or use the absolute path to execute the command.