const axios = require('axios');

const temperatureSourceUrl ='https://temperature-sensor-service.herokuapp.com/sensor/';

module.exports = class TemperatureDataProvider {

    /**
     * Returns the temperates for the specified containers.
     * @param {string[]} containerIds - Ids of the containers for which we want the temperatures
     */
    async * fetchTemperatureFor(containerIds) {
        if (!containerIds || containerIds.length <= 0) {
            throw 'Argument exception - containerIds should be non-null and contain values.';
        }

        const promises = [];

        try {
            for (const containerId of containerIds){
               promises.push(axios.get(temperatureSourceUrl + containerId));
            }

            for (const promise of promises){
                yield (await promise).data;
            }
            
        } catch (e) {
            console.log(e);
            throw 'Error while attempting to fetch temperature data.';
        }
    }
};
