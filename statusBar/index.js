const { addMainInterval } = require("./../timer");
const { timeConverterString } = require("./../utils/timeConverter");
const {
  statusBarNotificationRef,
  addStatusBarNotification,
} = require("./statusBarNotification.js");
const vscode = require("vscode");

const defaultIcon = "watch";
const statusBar = () => {
  const timerStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  timerStatusBarItem.show();

  let notificationCounter = 0;
  let icon = defaultIcon;
  addMainInterval((time) => {
    const strTime = timeConverterString(time);
    timerStatusBarItem.text = `$(${icon}) ${strTime}`;

    // check and end notification
    if (notificationCounter !== 0) {
       console.log(timerStatusBarItem.tooltip)
          notificationCounter--;
      return;
    } else {
        icon = defaultIcon;
        timerStatusBarItem.color = undefined;
        timerStatusBarItem.tooltip = undefined;
    }
    console.log(statusBarNotificationRef.value);

    // start notification
    if (statusBarNotificationRef.value) {
      notificationCounter = statusBarNotificationRef.value.time;
      icon = statusBarNotificationRef.value.icon;
      if (statusBarNotificationRef.value.color) {
        timerStatusBarItem.color = statusBarNotificationRef.value.color;
      }
      timerStatusBarItem.tooltip = statusBarNotificationRef.value.text;
      statusBarNotificationRef.value = null;
    }
  }, 1);
};

module.exports = { statusBar, addStatusBarNotification };
