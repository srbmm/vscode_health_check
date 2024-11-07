const vscode = require('vscode');

function activate(context) {
    // Display a simple alert as a modal
    vscode.window.showInformationMessage('This is a modal-like alert!', { modal: true });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
