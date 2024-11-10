const { addMainTimeout } = require("./timeouts.js");
const { generateId } = require("../utils/generateId.js");

const mainTimeoutDeleteIds = [];
const makeInterval = (timeoutFunc, deleteList, isVscode, ) => {
  const newId = generateId();

  const intervalFunc = (callback, time) => {
    timeoutFunc((now) => {
      callback(now);
      intervalFunc(callback, time);
    }, time, isVscode, newId);
    
    
    const newData = {
      id: newId,
    };
    return newData;
  };
  return intervalFunc;
};
const addMainInterval = (callback, time, isVscode) => {
  const intervalFunc = makeInterval(addMainTimeout, mainTimeoutDeleteIds, isVscode);
  return intervalFunc(callback, time);
};
const deleteMainInterval = (id) => {
  mainTimeoutDeleteIds.push(id);
};

module.exports = {
  addMainInterval,
  deleteMainInterval,
};
