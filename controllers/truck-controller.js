module.exports = class TruckController {

    /**
     * 
     * @param {*} logger - Instance of the logging service
     * @param {*} webNotificationProvider - Web notification provider, providing notifications in a format for a browser.
     * @param {*} beerDataProvider - beer data provider for retrieving beer info.
     * @param {*} truckDataProvider - truck data provider for retrieving info about truck contents
     * @param {*} temperatureDataProvider - provider that supplies temperature data about the truck content
     */
    constructor(logger, webNotificationProvider, beerDataProvider, truckDataProvider, temperatureDataProvider) {

        this._logger = logger;
        this._notificationProvider = webNotificationProvider;
        this._beerDataProvider = beerDataProvider;
        this._truckDataProvider = truckDataProvider;
        this._temperatureDataProvider = temperatureDataProvider;

        this._logger.logInfo('Truck Controller Initialized...');
    }

    /**
     * [/truck/notifications]
     * Gets all notifications
     * @param {*} req 
     * @param {*} res 
     */
    getNotifications(req, res) {
        try {
            let notifications = this._notificationProvider.getLatestNotifications();
            res.json(notifications);
        } catch (e) {
            this._logger.logError(e);
            throw e;
        }
    }

    /**
     * [/truck/notifications]
     * Gets info about the contents of the truck, including beer type, ideal temperatures and current temperature
     * @param {*} req 
     * @param {*} res 
     */
    async getContentInfo(req, res) {
        try {
            let truckContent = this._truckDataProvider.getContents();

            // Get all the unique beer types in the truck and their info
            // This would typically be cached by the provider, so we can just call it.
            let beerTypes = [...new Set(truckContent.map(container => container.type))];
            let beerIds = truckContent.map(container => container.id);

            let beerTypeInfo = {};

            beerTypes.forEach(beerType => {
                let beerInfo = this._beerDataProvider.getBeerInfoFor(beerType);
                beerTypeInfo[beerType] = beerInfo;
            });

            let temperatures = await this._temperatureDataProvider.getTemperatures(beerIds);

            let contentInfo = temperatures.map(tempInfo => {
                let container = truckContent.find(x => x.id === parseInt(tempInfo.id));
                return {
                    containerId: container.id,
                    type: container.type,
                    temperature: tempInfo.temperature,
                    minTemp: beerTypeInfo[container.type].minTemp,
                    maxTemp: beerTypeInfo[container.type].maxTemp,
                    position: container.position
                };
            });

            res.json(contentInfo);
        } catch (e) {
            this._logger.logError(e);
            throw e;
        }
    }
};
