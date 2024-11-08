const generateId = () => {
    return Math.round(Math.random() * (10 ** 12))
}
module.exports = {
    generateId
}