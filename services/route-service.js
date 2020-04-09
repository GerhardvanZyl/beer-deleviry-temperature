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

        this._app.get('/', (req, res) => {
            res.sendFile(__dirname + '../wwwroot/index.html');
        });

        let truckController = this._truckController;
        this._app.get('/api/truck/notifications', truckController.getNotifications.bind(truckController));
        this._app.get('/api/truck/contentInfo', truckController.getContentInfo.bind(truckController));

        this._logger.logInfo('Routes initialized ...');
    }

};