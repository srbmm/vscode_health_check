const vscode = require('vscode');

function activate(context) {
    // Create a new status bar item for the timer
    const timerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    
    let seconds = 0;
    let timerRunning = false;
    let interval = null;
    let activityTimer = null;
    const maxActivityTime = 20 * 1000; // 20 seconds of user activity (in milliseconds)

    timerStatusBarItem.text = `$(watch) 00:00`; // Initial text with icon
    timerStatusBarItem.tooltip = 'Elapsed time since starting'; // Tooltip without icon
    timerStatusBarItem.color = '#FFA500'; // Set color to orange
    timerStatusBarItem.show();

    // Start the timer when the window is focused
    vscode.window.onDidChangeWindowState((e) => {
        if (e.focused) {
            // VS Code gains focus, start the timer
            if (!timerRunning) {
                startTimer();
            }
        } else {
            // VS Code loses focus, stop the timer
            if (timerRunning) {
                stopTimer();
            }
        }
    });

    // Register for text document changes to detect user activity
    const textEditorChangeDisposable = vscode.workspace.onDidChangeTextDocument((e) => {
        resetActivityTimer();
    });

    // Register for selection changes to detect user activity
    const selectionChangeDisposable = vscode.window.onDidChangeTextEditorSelection((e) => {
        resetActivityTimer();
    });

    // Function to start the timer
    function startTimer() {
        timerRunning = true;
        interval = setInterval(() => {
            seconds += 1;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            // Update the timer text and tooltip with the elapsed time
            timerStatusBarItem.text = `$(watch) ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            timerStatusBarItem.tooltip = `Elapsed time: ${minutes} minute(s) and ${remainingSeconds} second(s)`;
        }, 1000);
    }

    // Function to stop the timer
    function stopTimer() {
        timerRunning = false;
        clearInterval(interval);
    }

    // Reset the activity timer whenever the user interacts
    function resetActivityTimer() {
        if (activityTimer) {
            clearTimeout(activityTimer); // Reset the activity timer
        }
        activityTimer = setTimeout(() => {
            // If no activity for 20 seconds, stop the timer
            stopTimer();
        }, maxActivityTime); // 20 seconds of inactivity stops the timer
    }

    // Stop the interval when the extension is deactivated
    context.subscriptions.push(timerStatusBarItem);
    context.subscriptions.push(textEditorChangeDisposable);
    context.subscriptions.push(selectionChangeDisposable);
    context.subscriptions.push({ dispose: () => clearInterval(interval) });
    context.subscriptions.push({ dispose: () => clearTimeout(activityTimer) });
}

function deactivate() {
    // Clean up if needed
}

module.exports = {
    activate,
    deactivate
};
