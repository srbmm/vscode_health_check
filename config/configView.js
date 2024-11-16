const vscode = require('vscode');
const { saveConfig, readConfig } = require('./storage');
const { practices } = require('./../constance/practices');
const { guideView } = require('../webViews'); // Assuming guideView is in the guideView.js file

// Class for individual configuration items
class ConfigItem extends vscode.TreeItem {
  constructor(label, command) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.command = command;
  }
}

// Class to provide configuration items to the view
class ConfigProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  getTreeItem(element) {
    return element;
  }

  getChildren() {
    // Add a dynamic guide view item
    const guideItem = new ConfigItem('Health & Plugin Guide', {
      command: 'health-time.openGuide', // Custom command to open the guide
      title: 'Open Health Guide',
    });

    // Add dynamic practice items
    const practiceItems = practices.map(
      (practice) =>
        new ConfigItem(practice.name, {
          command: 'health-time.configurePractice',
          title: 'Configure Practice',
          arguments: [practice.name], // Pass the practice name as an argument
        })
    );

    return [guideItem, ...practiceItems];
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}


// Function to configure level
function configureLevel(practiceName) {
  vscode.window
    .showQuickPick(['low', 'medium', 'high'], {
      placeHolder: `Select a level for "${practiceName}"`,
    })
    .then((selectedLevel) => {
      if (!selectedLevel) return;

      const currentConfig = readConfig();
      const updatedConfig = currentConfig.map((practice) => {
        if (practice.name === practiceName) {
          return { ...practice, level: selectedLevel };
        }
        return practice;
      });

      saveConfig(updatedConfig);
      vscode.window.showInformationMessage(
        `Level for "${practiceName}" set to "${selectedLevel}"`
      );
    });
}

// Function to enable/disable a practice
function configureStatus(practiceName) {
  vscode.window
    .showQuickPick(['Enable', 'Disable'], {
      placeHolder: `Enable or Disable "${practiceName}"`,
    })
    .then((selectedStatus) => {
      if (!selectedStatus) return;

      const currentConfig = readConfig();
      const updatedConfig = currentConfig.map((practice) => {
        if (practice.name === practiceName) {
          return { ...practice, status: selectedStatus === 'Enable' };
        }
        return practice;
      });

      saveConfig(updatedConfig);
      vscode.window.showInformationMessage(
        `"${practiceName}" has been ${selectedStatus.toLowerCase()}d`
      );
    });
}
// Function to handle practice configuration
function configurePractice(practiceName) {
  const currentConfig = readConfig(); // Read the current configuration
  const practice = currentConfig.find((p) => p.name === practiceName);

  if (!practice) {
    vscode.window.showErrorMessage(`Practice "${practiceName}" not found!`);
    return;
  }

  // Create a menu to configure level, status, or description
  vscode.window
    .showQuickPick(['Configure Level', 'Enable/Disable'], {
      placeHolder: `Select an option to configure "${practiceName}"`,
    })
    .then((selectedOption) => {
      if (!selectedOption) return;

      switch (selectedOption) {
        case 'Configure Level':
          configureLevel(practiceName);
          break;
        case 'Enable/Disable':
          configureStatus(practiceName);
          break;
      }
    });
}

// Function to open the Health Guide in a Webview
function openGuide() {
  const panel = vscode.window.createWebviewPanel(
    'healthGuide', // Panel ID
    'Health Guide', // Title
    vscode.ViewColumn.One, // Show in the first column
    {
      enableScripts: true, // Allow scripts in the webview
      retainContextWhenHidden: true, // Retain the webview content when hidden
    }
  );

  panel.webview.html = guideView(); // Set the HTML content for the webview
}

// Export classes and functions
module.exports = {
  ConfigProvider,
  configurePractice,
  openGuide, // Export the openGuide function
};