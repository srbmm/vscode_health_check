const timeConverterNumber = (secondsInput) => {
    const hours = Math.floor(secondsInput / 3600);
    const minutes = Math.floor((secondsInput % 3600) / 60);
    const seconds = secondsInput % 60;

    return {hours, minutes, seconds};
    
}
 
const timeConverterString = (secondsInput) => {
    const {hours, minutes, seconds} = timeConverterNumber(secondsInput);
    const strHours = String(hours).padStart(2, '0'); 
    const strMinutes = String(minutes).padStart(2, '0'); 
    const strSeconds = String(seconds).padStart(2, '0'); 
    return `${strHours}:${strMinutes}:${strSeconds}`;
}


module.exports = {
    timeConverterNumber,
    timeConverterString
}