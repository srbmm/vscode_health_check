const statusBarNotificationRef = {
    value: null,
}
const addStatusBarNotification = ({icon, color, text, time}) => {
    statusBarNotificationRef.value = {icon, color, text, time};
}

module.exports = {
    statusBarNotificationRef,
    addStatusBarNotification
}