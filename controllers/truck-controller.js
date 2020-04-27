const TruckDataProvider = require('../providers/mock-truck-data-provider');
const BeerDataProvider = require('../providers/mock-beer-data-provider');
const TemperatureDataProvider = require('../providers/temperature-data-provider');

/**
 * [/truck/content]
 * Gets info about the contents of the truck, including beer type, ideal temperatures and current temperature
 * @param {*} req 
 * @param {*} res 
 */
module.exports = {
    getContent: async (req, res) => {
        try {

            const truckContent = new TruckDataProvider().fetchContent();

            // Get all the unique beer types in the truck and their info and clone into a new object
            const beerTypes = [...new Set(truckContent.map(container => container.type))];

            const beerIds = truckContent.map(container => container.id);

            const beerTypeInfo = {};
            beerTypes.forEach(beerType => {
                // clone the result of the beer info fetched from the provider into a new object.
                // and use the beer type as the key
                const beerInfo = { ... new BeerDataProvider().fetchBeerInfoFor(beerType) };
                beerTypeInfo[beerType] = beerInfo;
            });

            const temperatures = await new TemperatureDataProvider().fetchTemperatureFor(beerIds);

            // Create an array of container info objects, containing the beer type,
            // the ideal temperatures and the current temperature
            const contentInfo = temperatures.map(temperatureInfo => {
                const container = truckContent.find(currentContainer => currentContainer.id === temperatureInfo.id);
                return {
                    containerId: container.id,
                    beerName: container.type,
                    temperature: temperatureInfo.temperature,
                    minTemp: beerTypeInfo[container.type].minTemp,
                    maxTemp: beerTypeInfo[container.type].maxTemp,
                    position: container.position
                };
            });

            res.json(contentInfo);
        } catch (e) {
            console.log(e);
            
            res.status(500).send({
                error: 'An error occured while trying to retrieve the truck content info.'
            });
        }
    },

    getTemperatures: async (req, res) => {
        try{

            const argumentException = 'Expected container ids in the request';
            if(!req.query.beerIds){
                throw argumentException;
            }

            const beerIds = req.query.beerIds.split(',');
            if(beerIds.length <= 0){
                argumentException;
            }

            const temperatures = await new TemperatureDataProvider().fetchTemperatureFor(beerIds);

            res.json(temperatures);

        } catch (e) {
            console.log(e);
            
            res.status(500).send({
                error: 'An error occured while trying to retrieve the truck content info.'
            });
        }
    }
};

