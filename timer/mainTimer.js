const { mainTimeouts, vscodeTimeouts } = require("./timeouts.js");

const aSecond = 1000;

const mainTimer = () => {
  // main timer
  console.log('timer started')
  let timeCounter = 0;
  setInterval(() => {
    timeCounter++;
    mainTimeouts.forEach((event) => {
      event.cb(timeCounter);
    });
  }, aSecond);
};

module.exports = {
  mainTimer
}