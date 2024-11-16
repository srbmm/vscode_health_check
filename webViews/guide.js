const { readConfig } = require("../config/storage");
const guideView = (inputName) => {
    const config = readConfig(); // Assuming config contains a healthTips array
    const healthTips = config || []; // Get the health tips from the config

    // Generate dynamic tip cards
    const tipCards = healthTips.map((tip, index) => {
        const isOpen = tip.name === inputName ? 'open' : '';
        return `
            <div class="tip-card ${isOpen}">
                <button class="tip-title" data-index="${index}">
                    <span class="icon">${tip.emoji}</span>
                    <h3>${tip.name}</h3>
                </button>
                <div class="tip-description" id="tip-description-${index}">
                    <p>${tip.longDescription}</p>
                </div>
            </div>
        `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Guide</title>
    <style>
        /* Centered Health Guide */
        .health-guide {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            font-family: Arial, sans-serif;
        }

        .guide-content {
            display: block;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            margin-top: 10px;
        }

        .tabs {
            display: flex;
            justify-content: space-between;
        }

        .tab-button {
            flex: 1;
            padding: 10px;
            background: #f1f1f1;
            border: 1px solid #ccc;
            cursor: pointer;
            text-align: center;
        }

        .tab-button.active {
            background: #4CAF50;
            color: white;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .tip-card {
            display: flex;
            flex-direction: column;
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        }

        .tip-title {
            display: flex;
            align-items: center;
            background: #007b5e;
            color: white;
            padding: 12px;
            border: none;
            width: 100%;
            cursor: pointer;
            text-align: left;
            font-size: 16px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .tip-title:hover {
            background: #005f46;
        }

        .icon {
            font-size: 24px;
            margin-right: 10px;
        }

        .tip-description {
            display: none;
            padding: 10px;
            background: #f1f1f1;
            margin-top: 10px;
            border-radius: 5px;
        }

        .tip-card.open .tip-description {
            display: block;
        }

        .tip-card h3 {
            margin: 0;
            font-size: 16px;
        }

        .tip-card p {
            margin: 5px 0 0;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="health-guide">
        <div class="guide-content">
            <div class="tabs">
                <button class="tab-button active" data-tab="guide-plugin">Plugin Guide</button>
                <button class="tab-button" data-tab="guide-health">Health Tips</button>
            </div>
            <div class="tab-content active" id="guide-plugin">
                <h2>Plugin Guide</h2>
                <p>Follow these steps to use the plugin:</p>
                <ul>
                    <li>Set the notification level to <strong>low</strong>, <strong>medium</strong>, or <strong>high</strong> as per your preference.</li>
                    <li>Check the countdown timer for notifications in the status bar at the bottom of the editor.</li>
                    <li>Enable or disable the plugin based on your current workflow needs.</li>
                </ul>
            </div>
            <div class="tab-content" id="guide-health">
                <h2>Health Tips</h2>
                ${tipCards}
            </div>
        </div>
    </div>
    <script>
        // JavaScript for tab switching and accordion functionality
        document.addEventListener("DOMContentLoaded", function () {
            const tabButtons = document.querySelectorAll(".tab-button");
            const tabContents = document.querySelectorAll(".tab-content");

            // Tab switching
            tabButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach((btn) => btn.classList.remove("active"));
                    tabContents.forEach((content) => content.classList.remove("active"));

                    // Add active class to the clicked button and corresponding content
                    button.classList.add("active");
                    const targetTab = button.getAttribute("data-tab");
                    document.getElementById(targetTab).classList.add("active");
                });
            });

            // Accordion functionality for tips
            const tipTitles = document.querySelectorAll(".tip-title");
            tipTitles.forEach((title) => {
                title.addEventListener("click", () => {
                    const tipCard = title.closest(".tip-card");
                    tipCard.classList.toggle("open");
                });
            });
        });
    </script>
</body>
</html>`;
};

module.exports = {
    guideView,
};
