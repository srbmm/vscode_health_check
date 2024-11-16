const fs = require('fs');
const path = require('path');
const { practices } = require("./../constance/practices");

const filePath = path.join(__dirname, 'config.json');

// Define default settings
const defaultConfig = practices;

// Function to save configuration data to a file
function saveConfig(updatedConfig) {
  const currentConfig = readConfig(); // Get the current configuration

  // Merge the updates into the current configuration, ignoring status and level changes
  const mergedConfig = currentConfig.map((currentPractice) => {
    const updatedPractice = updatedConfig.find(p => p.name === currentPractice.name);

    if (updatedPractice) {
      return {
        ...currentPractice,
        description: updatedPractice.description,
        longDescription: updatedPractice.longDescription,
        emoji: updatedPractice.emoji,
        color: updatedPractice.color,
        time: updatedPractice.time,
        timeOut: updatedPractice.timeOut,
      };
    }

    return currentPractice; // Keep the current practice if not updated
  });

  // Write the updated configuration back to the file
  fs.writeFileSync(filePath, JSON.stringify(mergedConfig, null, 2));
}

// Function to read configuration data from the file
function readConfig() {
  if (fs.existsSync(filePath)) {
    const config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return config; // Return the existing config
  } else {
    saveConfig(defaultConfig); // Save default settings if no config file exists
    return defaultConfig; // Return default settings
  }
}

module.exports = {
  saveConfig,
  readConfig,
};
