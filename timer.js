const vscode = require('vscode');

function activate(context) {
    // Create a new status bar item for the timer
    const timerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    
    let seconds = 0;
    timerStatusBarItem.text = `$(watch) 00:00`; // Initial text with icon
    timerStatusBarItem.tooltip = 'Elapsed time since starting'; // Tooltip without icon
    timerStatusBarItem.color = '#FFA500'; // Set color to orange
    timerStatusBarItem.show();

    // Set up the click handler to open a web view
    timerStatusBarItem.command = 'extension.openWebView'; // Assign a custom command

    // Register the command in the context
    context.subscriptions.push(vscode.commands.registerCommand('extension.openWebView', () => {
        const panel = vscode.window.createWebviewPanel(
            'timerWebView', // Identifies the type of the web view. Used internally
            'Timer Web View', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new web view panel in
            {} // Webview options (optional)
        );

        // Set the HTML content for the web view
        panel.webview.html = getWebviewContent();
    }));

    // Update the timer every second
    const interval = setInterval(() => {
        seconds += 1;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        // Update the timer text and tooltip with the elapsed time
        timerStatusBarItem.text = `$(watch) ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        timerStatusBarItem.tooltip = `Elapsed time: ${minutes} minute(s) and ${remainingSeconds} second(s)`;
    }, 1000);

    // Stop the interval when the extension is deactivated
    context.subscriptions.push(timerStatusBarItem);
    context.subscriptions.push({ dispose: () => clearInterval(interval) });
}

function getWebviewContent() {
    // Return the HTML content for the web view
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Timer Web View</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #f3f3f3;
            }
            h1 {
                color: #333;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to the Timer Web View!</h1>
        <p>This is a simple web view associated with your timer.</p>
        <p>You can add any content you like here!</p>
    </body>
    </html>`;
}

function deactivate() {
    // Clean up if needed
}

module.exports = {
    activate,
    deactivate
};
