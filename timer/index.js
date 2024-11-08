const { addVscodeTimeout, addMainTimeout, deleteMainTimeout, deleteVscodeTimeout } = require("./timeouts.js");
const { addVscodeInterval, addMainInterval, deleteMainInterval, deleteVscodeInterval } = require("./intervals.js");
const { mainTimer } = require("./mainTimer.js");
module.exports = {
  addVscodeTimeout,
  addMainTimeout,
  mainTimer,
  addMainInterval,
  addVscodeInterval,
  deleteMainTimeout,
  deleteVscodeTimeout,
  deleteMainInterval,
  deleteVscodeInterval,
};
