const vscode = require('vscode');

const checkUserActive = () => {

    let isVSCodeFocusedRef = {value: false};
    let isUserActiveRef = {value: true};
    let idleTimeout;

    function startIdleTimer() {
        if (idleTimeout) clearTimeout(idleTimeout);
        isUserActiveRef.value = true;
    
        idleTimeout = setTimeout(() => {
            isUserActiveRef.value = false;
            console.log('User is now idle');
        }, 5000); // Set to 5 seconds or your desired idle timeout
    }
                // Event listener for window focus changes
        vscode.window.onDidChangeWindowState((windowState) => {
            isVSCodeFocusedRef.value = windowState.focused;
        });


        vscode.workspace.onDidChangeTextDocument(() => startIdleTimer());
        vscode.window.onDidChangeTextEditorSelection(() => startIdleTimer());
        vscode.window.onDidChangeActiveTextEditor(() => startIdleTimer());   
    
        return {isUserActiveRef, isVSCodeFocusedRef}
}

module.exports = {
    checkUserActive
}