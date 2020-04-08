module.exports = class WebNotificationProvider {
    constructor(logger) {
        this._logger = logger;
        this._notifications = [];
    }

    /**
     * Send a notification.
     * @param {object} notificationInfo 
     */
    notify(notificationInfo) {
        this._notifications.push(notificationInfo);
    }

    /**
     * Get all the latest notifications
     */
    getLatestNotifications() {
        // Make a copy
        let notifications = this._notifications.map(a => Object.assign({}, a));

        // then clear
        this._notifications = [];

        return notifications;
    }
};