// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "healthCheck" is now active!');
	
		// The code you place here will be executed every time your command is executed
		const twentyMinutes = 20000; // 20 minutes in milliseconds
		const twentySeconds = 10000; // 20 seconds in milliseconds
	
		setInterval(() => {
			// Create a webview panel to act as a blocking overlay
			const panel = vscode.window.createWebviewPanel(
				'eyeBreak', // Unique identifier for the webview
				'Eye Break', // Title
				vscode.ViewColumn.One, // Show in the main editor column
				{ enableScripts: true } // Enable JavaScript
			);
	
			// Set HTML content for the webview
			panel.webview.html = `
				<html>
				<body style="display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #222;">
					<h1 style="color: #fff;">Take a 20-second break for your eyes!</h1>
				</body>
				</html>
			`;
	
			// Close the webview after 20 seconds
			setTimeout(() => {
				panel.dispose();
			}, twentySeconds);
		}, twentyMinutes);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('healthCheck.helloWorld', function () {
	
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Health check!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
