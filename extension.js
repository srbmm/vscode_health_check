const { checkUserActive } = require("./events");
const { statusBar, addStatusBarNotification } = require("./statusBar");
const vscode = require("vscode");
const { mainTimer, addMainInterval, deleteMainInterval, addMainTimeout, deleteMainTimer } = require("./timer");

function activate(context) {
  console.log("extension started");
  const {isUserActiveRef, isVSCodeFocusedRef} = checkUserActive()
  mainTimer(isVSCodeFocusedRef);
  statusBar();

  
  
  // Event listeners to reset the idle timer on user activity

  // // Periodic check (optional, just to log states)
  // setInterval(() => {
  //     console.log('VS Code focused:', isVSCodeFocused, 'User active:', isUserActive);
  // }, 1000);

}

// This method is called when your extension is deactivated
function deactivate() {
  deleteMainTimer();
}

module.exports = {
  activate,
  deactivate,
};

