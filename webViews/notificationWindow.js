function getLevel3Window(text, color,emoji) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notification</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background: #ccc;
          color: #ffffff;
          overflow: hidden;
        }
        .popup {
          padding: 25px 30px;
          background: ${color};
          color: white;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
          font-size: 18px;
          max-width: 400px;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 15px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: fadeIn 0.5s ease-out;
        }
        .popup:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
        }
        .icon {
          font-size: 42px;
          animation: bounce 1s infinite alternate;
        }
        .text {
          font-weight: 600;
          line-height: 1.5;
          font-size: 20px;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }
      </style>
    </head>
    <body>
      <div class="popup" id="clickablePopup">
        <div class="icon">${emoji}</div>
        <div class="text">${text}</div>
      </div>

      <script>
        const vscode = acquireVsCodeApi();
        document.addEventListener('DOMContentLoaded', function() {
          const popup = document.getElementById('clickablePopup');
          popup.addEventListener('click', function() {
            vscode.postMessage({ command: 'popupClicked' });
          });
        });
      </script>
    </body>
    </html>
  `;
}

  
  function getLevel2Window(iconUri, color, text) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom Bottom-Right Message</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: transparent;
            overflow: hidden;
          }
          .popup {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${color};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            font-size: 14px;
            max-width: 250px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .icon {
          font-size: 36px;
          }
        </style>
      </head>
      <body>
        <div class="popup">
          ${text}
        </div>
      </body>
      </html>
    `;
  }
  
  
  module.exports = {
    getLevel2Window,
    getLevel3Window,
  };
  