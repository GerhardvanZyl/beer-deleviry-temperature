module.exports = class MonitoringService {

    constructor(logger, configService, truckDataProvider, beerDataProvider, temperatureDataProvider) {
        this._logger = logger;
        this._configService = configService;
        this._monitoringInterval = configService.getConfigFor('monitoringInterval') * 1000;
        this._notificationProviders = [];
        this._truckDataProvider = truckDataProvider;
        this._beerDataProvider = beerDataProvider;
        this._temperatureDataProvider = temperatureDataProvider;
        this._beerTypeInfo = {};
        this._truckContent = {};
        this._intervalHandles = {};
    }

    /**
     * Register a notification provider
     * @param {object} notificationProvider 
     */
    register(notificationProvider) {
        if (typeof notificationProvider.notify !== 'function') {
            throw 'Notification Providers must have a notify method.';
        }

        this._notificationProviders.push(notificationProvider);
    }

    /**
     * Notifies all notification providers
     * @param {object} container - object representing a truck container
     * @param {number} temperature - temperature of that container
     */
    notify(container, temperature) {

        // could use object.assign to merge the objects, but then one object gets a duplicate property 
        // and we have a hard to find bug.
        let notification = {
            containerId: container.id,
            type: container.type,
            temperature: temperature,
            minTemp: this._beerTypeInfo[container.type].minTemp,
            maxTemp: this._beerTypeInfo[container.type].maxTemp,
            position: container.position
        };

        this._notificationProviders.forEach(provider => provider.notify(notification));
    }

    /**
     * Start monitoring
     */
    start() {
        this.populateBeerInfo();

        this._truckContent.forEach(container => {
            this._intervalHandles[container.id] = setInterval(this.checkTemperature.bind(this, container), this._monitoringInterval);
        });
    }

    /**
     * Retrieves the beer info, and populates the monitoring service with that info.
     * Info consists of beer names and required temperatures
     */
    populateBeerInfo() {
        this._truckContent = this._truckDataProvider.getContents();

        // Get all the unique beer types in the truck and their info
        let beerTypes = [...new Set(this._truckContent.map(container => container.type))];

        this._beerTypeInfo = {};

        beerTypes.forEach(beerType => {
            let beerInfo = this._beerDataProvider.getBeerInfoFor(beerType);
            this._beerTypeInfo[beerType] = beerInfo;
        });

    }

    /**
     * Checks the temperature for the specified container
     * @param {object} container - object representing a container
     */
    checkTemperature(container) {
        this._temperatureDataProvider.getTemperatureFor(container.id)
            .then((temperature) => {
                let beerInfo = this._beerTypeInfo[container.type];

                if (temperature < beerInfo.minTemp || temperature > beerInfo.maxTemp)
                    this.notify(container, temperature);
            }
            ).catch(reason => {
                this._logger.logError(reason);
                throw reason;
            });
    }
};