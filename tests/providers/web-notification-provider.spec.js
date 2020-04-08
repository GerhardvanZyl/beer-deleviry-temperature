const WebNotificationProvider = require('../../providers/notification-providers/web-notification-provider');

let loggerMock = {
    logInfo: ()=>{},
    logWarning: ()=>{},
    logError: ()=>{}
};

describe('WebNotificationProvider', ()=>{
    it('should initialize', ()=>{
        let wnp = new WebNotificationProvider(loggerMock);

        expect(wnp).toBeDefined();
    });

    describe('getLatestNotifications', ()=>{
        it('should return the notifications that were added', ()=>{
            let wnp = new WebNotificationProvider(loggerMock);
            
            wnp.notify({temperature: 6});
            wnp.notify({temperature: 2});
            
            let notifications = wnp.getLatestNotifications();

            expect(notifications[0].temperature).toBe(6);
            expect(notifications[1].temperature).toBe(2);
        });

        it('should not return the same notifications more than once', ()=>{
            let wnp = new WebNotificationProvider(loggerMock);
            
            wnp.notify({temperature: 6});
            wnp.notify({temperature: 2});
            
            wnp.getLatestNotifications();
            let notifications = wnp.getLatestNotifications();

            expect(notifications.length).toBe(0);
        });
    });
});