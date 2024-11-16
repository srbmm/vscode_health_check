const vscode = require('vscode');
const { saveConfig, readConfig } = require('./storage');
const { practices } = require('./../constance/practices');

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
    // Create dynamic items based on practices
    return practices.map(
      (practice) =>
        new ConfigItem(practice.name, {
          command: 'health-time.configurePractice',
          title: 'Configure Practice',
          arguments: [practice.name], // Pass the practice name as an argument
        })
    );
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
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
// Export classes and functions
module.exports = {
  ConfigProvider,
  configurePractice,
};