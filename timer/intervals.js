const { addMainTimeout, addVscodeTimeout } = require("./timeouts.js");
const { generateId } = require("../utils/generateId.js");

const mainTimeoutDeleteIds = [];
const vsCodeTimeoutDeleteIds = [];
const makeInterval = (timeoutFunc, deleteList) => {
  const newId = generateId();

  const intervalFunc = (callback, time) => {
    const data = timeoutFunc((now) => {
      const index = mainTimeoutDeleteIds.findIndex(item => item === newId)
      if(index !== -1) {
        return deleteList.splice(index, 1);
      }
      callback(now);
      intervalFunc(callback, time);
    }, time);
    const newData = {
      timeToGoalRef: data.timeToGoalRef,
      id: newId
    }
    return newData;
  }
  return intervalFunc
}
const addMainInterval = (callback, time) => {
  const intervalFunc = makeInterval(addMainTimeout, mainTimeoutDeleteIds)
  return intervalFunc(callback, time);
};

const addVscodeInterval = (callback, time) => {
  const intervalFunc = makeInterval(addVscodeInterval, vsCodeTimeoutDeleteIds)
  return intervalFunc(callback, time);
};

const deleteMainInterval = (id) => {
  console.log(id)
  mainTimeoutDeleteIds.push(id);
}
const deleteVscodeInterval = (id) => {
  vsCodeTimeoutDeleteIds.push(id);
}
module.exports = {
  addMainInterval,
  addVscodeInterval,
  deleteMainInterval,
  deleteVscodeInterval
}