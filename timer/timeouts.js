
const mainTimeouts = []
const vscodeTimeouts = []

let idCounter = 0;

const makeTimeout = (timeouts) => {
    return (callback, timeout) => {
        let goalTime = null;
        const id = idCounter++;
        const timeToGoalRef = {
            value: 0
        }
        
        const deleteItem =  () => {
            const index = timeouts.findIndex(item => item.id === id);
            if(index !== -1){
                timeouts.splice(index, 1);
            }
        }
        timeouts.push({
            id,
            cb: (time) => {  
                if(goalTime === null){
                    goalTime = time + timeout;
                }
                timeToGoalRef.value = goalTime - time;
                if(timeToGoalRef.value <= 0){
                    callback(time);
                    deleteItem();
                }
            },
        })
        return {id, timeToGoalRef};
    }
}


const addMainTimeout = (callback, time) => {
    const mainTimeout = makeTimeout(mainTimeouts);
    return mainTimeout(callback, time - 1); 
}

const addVscodeTimeout = (callback, time) => {
    const vscodeTimeout = makeTimeout(vscodeTimeouts);
    return vscodeTimeout(callback, time - 1); 
}

const deleteMainTimeout = (id) => {
    const index = mainTimeouts.findIndex(item => item.id === id);
    if(index !== -1){
        mainTimeouts.splice(index, 1);
    }
}

const deleteVscodeTimeout = (id) => {
    const index = vscodeTimeouts.findIndex(item => item.id === id);
    if(index !== -1){
        mainTimeouts.splice(index, 1);
    }
}

module.exports = {
    mainTimeouts,
    vscodeTimeouts,
    addMainTimeout,
    addVscodeTimeout,
    deleteMainTimeout,
    deleteVscodeTimeout,
}