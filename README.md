# Vscode Health Check Extension Structure

### Source Code (`src/`)
- **src/extension.js**  
  The main entry point for the extension, handling activation and deactivation events.

---
#### Commands (`src/commands/`)
- **src/commands/RegisterCommands.js**  
  Registers all commands for the extension.
- **src/commands/ExampleCommand.js**  
  An example command module, typically interacting with the notification manager or other core modules.

---
#### Notifications (`src/notifications/`)
- **src/notifications/notificationManager.js**  
  Manages notifications, providing methods for displaying messages (e.g., info, warning, error).
- **src/notifications/notificationHelper.js**  
  Contains helper functions for notifications, supporting `NotificationManager`.
- **src/notifications/informationalNotification.js**  
  For general updates or non-urgent information.
- **src/notifications/advisoryNotification.js**   
  For warnings or notices that need some attention.
- **src/notifications/criticalNotification.js**    
  For urgent issues requiring immediate action.

---
#### Timer (`src/Rimer/`)
- **src/timer/mainTimer.js**   
  define the main internal timer and all the timer use this for count the time.
- **src/timer/timeController**  
  make your timer controller

---
#### Config (`src/config/`)
- **src/timer/config.js**   
  read or set config


---
#### constance (`src/constance/`)
- **src/constance/practices.js**   
  practices include healthy practice that have color, icon, repeat time etc...

---
#### Sidebar (`src/sidebar/`)
- **...**   
  .......

---
#### Web Views (`src/views/`)
- **src/views/helpView.js**  
  Learn user about the healthy advice.
- **src/views/notificationView.js**  
  For critical notification we use a web view.