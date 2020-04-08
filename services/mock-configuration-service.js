
/**
 * In a real world app, this would retrieve values from a DB or web service, and store values in memory.
 */
module.exports = class ConfigurationService {
    constructor(logger) {
        this._logger = logger;
    }

    getConfigFor(key) {
        switch (key) {
        case 'temperatureProviderEndpoint':
            return 'https://temperature-sensor-service.herokuapp.com';
        case 'monitoringInterval':
            return 5;
        default:
            throw `No config value for ${key} found`;
        }
    }

};