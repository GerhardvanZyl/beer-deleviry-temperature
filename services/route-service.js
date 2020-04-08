module.exports = class RouteService {

    /**
     * 
     * @param {*} app 
     * @param {*} controllers 
     */
    constructor(app, logger, truckController) {
        this._app = app;
        this._logger = logger;
        this._truckController = truckController;

        this._logger.logInfo('Route Service instantiated...');
    }

    /**
     * Initialize the api routes
     */
    initializeRoutes() {

        // Truck controller
        let truckController = this._truckController;
        this._app.get('/truck/notifications', truckController.getNotifications.bind(truckController));
        this._app.get('/truck/contentInfo', truckController.getContentInfo.bind(truckController));

        this._logger.logInfo('Routes initialized ...');
    }

};