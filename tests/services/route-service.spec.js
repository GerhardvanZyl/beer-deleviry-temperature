const RouteService = require('../../services/route-service');

describe('RouteService', () => {

    let routeService;
    let appMock = {
        get: () => { }
    };

    // Due to the nature of logging providers, just hardcoding a mock is sufficient
    let loggerMock = {
        logInfo: () => { },
        logWarning: () => { },
        logError: () => { }
    };

    beforeEach(() => {
        routeService = new RouteService(appMock, loggerMock, {});
    });

    it('should initialize', () => {
        expect(routeService).toBeDefined();
    });

});