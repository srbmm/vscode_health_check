const { statusBar, addStatusBarNotification } = require("./statusBar");

const vscode = require("vscode");
const { mainTimer, addMainInterval, deleteMainInterval, addMainTimeout } = require("./timer");

function activate(context) {
  console.log("extension started");
  mainTimer();
  statusBar();

  addMainTimeout(() => {
    addStatusBarNotification({icon: 'watch', color: '#cf8402', text: 'test for test', time: 10})
  }, 10)
  //   const data = addMainInterval((time) => {
  //     if (time > 10) {
  //       deleteMainInterval(data.id);
  //     }
  //     console.log("now: ", time);
  //   }, 4);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
