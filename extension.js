const vscode = require("vscode");
const { mainTimer, addMainInterval, deleteMainInterval } = require("./timer");

function activate(context) {
  console.log("extension started");
  mainTimer();
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
