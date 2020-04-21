const axios = require('axios');

const temperatureSourceUrl ='https://temperature-sensor-service.herokuapp.com/sensor/';

module.exports = class TemperatureDataProvider {

    /**
     * Returns the temperates for the specified containers.
     * @param {string[]} containerIds - Ids of the containers for which we want the temperatures
     */
    async fetchTemperatureFor(containerIds) {

        if (!containerIds || containerIds.length <= 0) {
            throw 'Argument exception - containerIds should be non-null and contain values.';
        }

        try {
            const requests = [];

            containerIds.forEach(containerId => {
                requests.push(
                    axios.get(temperatureSourceUrl + containerId)
                );
            });

            const responses = await axios.all(requests);

            const temperatures = responses.map(response => response.data);
            return temperatures;

        } catch (e) {
            console.log(e);
            throw 'Error while attempting to fetch temperature data.';
        }
    }
};
