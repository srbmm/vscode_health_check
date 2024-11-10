const { addMainTimeout, deleteMainTimeout } = require("./timeouts.js");
const { addMainInterval, deleteMainInterval } = require("./intervals.js");
const { mainTimer, deleteMainTimer } = require("./mainTimer.js");
module.exports = {
  addMainTimeout,
  mainTimer,
  addMainInterval,
  deleteMainTimeout,
  deleteMainInterval,
  deleteMainTimer,
};
