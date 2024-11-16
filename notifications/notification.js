const { addStatusBarNotification } = require("../statusBar");

const { addMainTimeout } = require("../timer");
const { getLevel3Window, guideView } = require("../webViews");
const vscode = require("vscode");

// level: medium, high
function notification(context, text, color, emoji, time, level) {
  if (level === "high") {
    const panel = vscode.window.createWebviewPanel(
      "customPopup",
      "",
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    panel.webview.onDidReceiveMessage(
      (message) => {
        if (message.command === "popupClicked") {
          const detailPanel = vscode.window.createWebviewPanel(
            "detailWebview",
            "Detailed Information",
            vscode.ViewColumn.One,
            {
              enableScripts: true,
            }
          );
          detailPanel.webview.html = guideView();
        }
      },
      undefined,
      context.subscriptions
    );

    panel.webview.html = getLevel3Window(text, color, emoji);
    addMainTimeout(() => {
      panel.dispose();
    }, time);
  }
  if (level === "medium") {
    vscode.window.showInformationMessage(emoji + ' "' + text + '"');
  }
  if (level === "low") {
    addStatusBarNotification({ emoji, color, text, time });
  }
}

module.exports = { notification };
