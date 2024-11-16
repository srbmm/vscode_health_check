const statusBarNotificationRef = {
    value: null,
}
const addStatusBarNotification = ({emoji, color, text, time}) => {
    statusBarNotificationRef.value = {emoji, color, text, time};
}

module.exports = {
    statusBarNotificationRef,
    addStatusBarNotification
}