const { PriorityQueue } = require("../dataStructure/priorityQueue.js");
const { mainTimeouts } = require("./timeouts.js");

const aSecond = 1000;

const pqMainTimeOuts = new PriorityQueue();
let mainTimerRef;
const mainTimer = (isUserActive) => {
  // main timer
  let timeCounter = 0;
  let userActiveCount = 0;
  mainTimerRef = setInterval(() => {
    timeCounter++;
    if(isUserActive.value){
      userActiveCount++;
    }

    // set new time outs
    for(const item of mainTimeouts){
      const timeToGoal = (item.isVscode ? userActiveCount : timeCounter) + item.timeout - 1;
      item.timeToGoal = timeToGoal;
      pqMainTimeOuts.enqueue(item, timeToGoal);
    }
    // clear time outs
    mainTimeouts.splice(0, mainTimeouts.length);

    // run time outs
    let last = pqMainTimeOuts.getFirst();
    while(last !== null && (last.node.timeToGoal - (last.node.isVscode ? userActiveCount : timeCounter)) <= 0 ){
      pqMainTimeOuts.dequeue().node.cb((last.node.isVscode ? userActiveCount : timeCounter));
      last = pqMainTimeOuts.getFirst();
    }

  }, aSecond);
};

const deleteMainTimer = () => {
  if(mainTimerRef){
    clearInterval(mainTimerRef);
  }
}
module.exports = {
  mainTimer,
  deleteMainTimer
}