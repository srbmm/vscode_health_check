const fs = require('fs');
const path = require('path');
const {practices} = require("./../constance/practices")

const filePath = path.join(__dirname, 'config.json');

///const practicesConfig = [{practiceName:"Eye",status:true}]

// Define default settings
const defaultConfig = practices       // Default


// Function to save configuration data to a file
function saveConfig(config) {
  const newConfig =  config;

  fs.writeFileSync(filePath, JSON.stringify(newConfig, null, 2));
}

// Function to read configuration data from the file
function readConfig() {
  if (fs.existsSync(filePath)) {
    const config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return config; // Merge with defaults if some keys are missing
  } else {
    saveConfig(defaultConfig); // Save default settings if no config file exists
    return defaultConfig;
  }
}

module.exports = {
  saveConfig,
  readConfig
};