const { practices } = require("./constance/practices");

const { checkUserActive } = require("./events");
const { statusBar } = require("./statusBar");
const {
  mainTimer,
  deleteMainTimer,
  addMainInterval,
} = require("./timer");
const { ConfigProvider, configurePractice, openGuide } = require("./config/configView"); // Import ConfigView and related methods
const { readConfig } = require("./config/storage"); // Import storage functions
const { notification } = require("./notifications");
const vscode = require("vscode");
function activate(context) {
  console.log("extension started");
  const { isUserActiveRef, isVSCodeFocusedRef } = checkUserActive();
  mainTimer(isVSCodeFocusedRef);
  statusBar();

  // Initialize the ConfigProvider for the tree view
  const configProvider = new ConfigProvider();

  // Read or initialize configuration
  const config = readConfig();

  // Create the tree view in the side bar
  const treeView = vscode.window.createTreeView("health-time-view", {
    treeDataProvider: configProvider,
  });

  // Register command to configure a specific practice
  const configurePracticeCommand = vscode.commands.registerCommand(
    "health-time.configurePractice",
    (practiceName) => {
      configurePractice(practiceName); // Call the function to handle practice configuration
    }
  );

  // Register the health guide command
  context.subscriptions.push(
    vscode.commands.registerCommand('health-time.openGuide', openGuide)
  );
  
  // Register refresh command (optional, to refresh the tree view manually)
  const refreshTreeViewCommand = vscode.commands.registerCommand(
    "health-time.refreshTreeView",
    () => {
      configProvider.refresh();
      vscode.window.showInformationMessage("Tree view refreshed!");
    }
  );

  // Add commands and tree view to context subscriptions
  context.subscriptions.push(
    treeView,
    configurePracticeCommand,
    refreshTreeViewCommand
  );

  // Event listeners to reset the idle timer on user activity

  // core
  for(let practice of config){
    addMainInterval(() => {
      const updatedPractice = readConfig().find(item => practice.name === item.name);
      if(!updatedPractice) return
      if(updatedPractice.status) notification(context, updatedPractice.description, updatedPractice.color, updatedPractice.emoji, updatedPractice.timeOut, updatedPractice.level)
    }, practice.time)
  }
}

// This method is called when your extension is deactivated
function deactivate() {
  deleteMainTimer();
}

module.exports = {
  activate,
  deactivate,
};
