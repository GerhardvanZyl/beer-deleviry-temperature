const axios = require('axios');

module.exports = class TemperatureDataProvider {
    constructor(logger, configService) {
        this._logger = logger;
        this._configService = configService;
    }

    /**
     * Retrieve the temperature for a specific container.
     * @param {string} containerId 
     * @returns * temperature: number
     */
    async getTemperatureFor(containerId) {

        let temperatureData;
        try {
            temperatureData = await axios
                .get(`${this._configService.getConfigFor('temperatureProviderEndpoint')}/sensor/${containerId} `);
        } catch (e) {
            this._logger.logError(e);
            throw 'Error while attempting to get temperature data. Please try again later.';
        }

        return temperatureData.data.temperature;
    }

    /**
     * Retrieve the temperatures for many containers at once
     * @param {string} containerIds 
     * @returns {id: string, temperature: number}
     */
    async getTemperatures(containerIds) {

        let requests = [];
        let responses;

        try {
            containerIds.forEach(containerId => {
                requests.push(
                    axios.get(`${this._configService.getConfigFor('temperatureProviderEndpoint')}/sensor/${containerId}`)
                );
            });

            responses = await axios.all(requests);
        } catch (e) {
            this._logger.logError(e);
            throw 'Error while attempting to get temperature data. Please try again later.';
        }

        let temperatures = responses.map(response => response.data);
        return temperatures;
    }
};