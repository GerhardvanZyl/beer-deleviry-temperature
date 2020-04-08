
/**
 * Mock provider for beer data. In a real world application this would be retrieved from a DB or web service.
 */
module.exports = class MockBeerDataProvider {

    constructor(logger) {
        this._logger = logger;
    }

    /**
     * Returns a list of beers and their ideal temperatures
     */
    getBeerInfoFor(beerType) {

        // In theory we would receive the data from a DB or web service.
        // That data would probably not be in the exact format we need, so we would
        // create a new response object returning only what we need, in the format that
        // makes the most sense for the rest of the application, thereby decoupling
        // the application from any specific datasource.

        switch (beerType) {
        case 'Pilsner':
            return { minTemp: 4, maxTemp: 6 };
        case 'IPA':
            return { minTemp: 5, maxTemp: 6 };
        case 'Lager':
            return { minTemp: 4, maxTemp: 7 };
        case 'Stout':
            return { minTemp: 6, maxTemp: 8 };
        case 'Wheat Beer':
            return { minTemp: 3, maxTemp: 5 };
        case 'Pale Ale':
            return { minTemp: 4, maxTemp: 6 };
        }
    }
};