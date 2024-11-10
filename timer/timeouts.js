const mainTimeouts = [];

let idCounter = 0;

const makeTimeout = (timeouts, isVscode, inputId) => {
    return (callback, timeout) => {
        const id = inputId ?? idCounter++;
        timeouts.push({
            id,
            cb: callback,
            timeout,
            isVscode
        })
        return {id};
    }
}


const addMainTimeout = (callback, time, isVscode, inputId) => {
    const mainTimeout = makeTimeout(mainTimeouts, isVscode, inputId);
    return mainTimeout(callback, time); 
}


const deleteMainTimeout = (id) => {
    // const index = mainTimeouts.findIndex(item => item.id === id);
    // if(index !== -1){
    //     mainTimeouts.splice(index, 1);
    //}
}


module.exports = {
    mainTimeouts,
    addMainTimeout,
    deleteMainTimeout,
}