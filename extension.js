const { checkUserActive } = require("./events");
const { statusBar, addStatusBarNotification } = require("./statusBar");
const { mainTimer, addMainInterval, deleteMainInterval, addMainTimeout, deleteMainTimer } = require("./timer");
const { ConfigProvider, configurePractice } = require('./config/configView'); // Import ConfigView and related methods
const { readConfig } = require('./config/storage'); // Import storage functions
const vscode = require('vscode')
function activate(context) {
  console.log("extension started");
  const {isUserActiveRef, isVSCodeFocusedRef} = checkUserActive()
  mainTimer(isVSCodeFocusedRef);
  statusBar();

   // Initialize the ConfigProvider for the tree view
   const configProvider = new ConfigProvider();

   // Read or initialize configuration
   const config = readConfig();
   console.log('Initial configuration:', config);
 
   // Create the tree view in the side bar
   const treeView = vscode.window.createTreeView('health-time-view', {
     treeDataProvider: configProvider
   });
 
   // Register command to configure a specific practice
   const configurePracticeCommand = vscode.commands.registerCommand(
     'health-time.configurePractice',
     (practiceName) => {
       configurePractice(practiceName); // Call the function to handle practice configuration
     }
   );
 
   // Register refresh command (optional, to refresh the tree view manually)
   const refreshTreeViewCommand = vscode.commands.registerCommand(
     'health-time.refreshTreeView',
     () => {
       configProvider.refresh();
       vscode.window.showInformationMessage('Tree view refreshed!');
     }
   );
 
   // Add commands and tree view to context subscriptions
   context.subscriptions.push(treeView, configurePracticeCommand, refreshTreeViewCommand);
  
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

