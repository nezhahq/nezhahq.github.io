---
outline: deep
---

# Task Management

**The Task Management section supports scheduling tasks, trigger-based tasks, and bulk execution across multiple servers.**  
Nezha Monitoring enables pushing commands to Agents for execution, supporting diverse scenarios such as:
- Periodic backups using `restic` or `rclone`.
- Scheduled service restarts to reset network connections.
- Triggered tasks based on alert rules, e.g., running a script when CPU usage remains high for an extended period.

---

## How to Use

### Adding a Task

1. **Access the Task Page**  
   Navigate to the **`Tasks`** page in the management panel and click the **`+`** button to add a new task.

2. **Configure Task Parameters**  
   When adding a task, the following parameters must be configured:
   - **Name**: Assign a custom name for easy identification and management.
   - **Task Type**:
     - **Scheduled Task**: Executes periodically based on the specified schedule.
     - **Trigger Task**: Executes only when triggered via API or notification rules, running once per trigger.
   - **Schedule**: Time schedule for task execution (only applies to scheduled tasks).  
     Format: `second minute hour day month weekday`.  
     Refer to the [CRON Expression Format](https://pkg.go.dev/github.com/robfig/cron/v3#hdr-CRON_Expression_Format) for details.  
     Example: `0 0 3 * * *` runs the task daily at 3:00 AM.
   - **Command**: The command to execute.  
     - The command format follows standard Shell/Bat scripting. Use `&&` (Linux) or `&` (Windows) to chain multiple commands.
     - Example: To reboot the server, enter `reboot`.
   - **Coverage Scope** and **Specific Servers**: Specify which Agents should execute the task:
     - Select coverage rules or specific servers.
     - For trigger tasks, choose "Execute on servers triggering the alert."
   - **Notification Group**: Select a notification method group configured in the **`Notifications`** page. See [Notification Configuration](/en_US/guide/notifications.html#flexible-notification-methods) for details.

3. **Submit Task**  
   After completing the configuration, click **`Submit`** to save the task.

---

## Managing Tasks

To manage existing tasks:
1. Go to the **`Tasks`** page and locate the desired task.
2. Use the icons on the right:
   - **Execute Immediately**: Bypasses the schedule and executes the task instantly.
   - **Edit**: Modify the task configuration.
   - **Delete**: Remove the task.

---

## Common Issues

### 1. **Command Not Found**

- If execution fails with a "command not found" error, it is usually due to the PATH environment variable not being properly loaded.
- **Solution**:
  - In Linux, prepend the command with `source ~/.bashrc`:
    ```bash
    source ~/.bashrc && your_command
    ```
  - Alternatively, use the command's absolute path (e.g., `/usr/bin/command`).