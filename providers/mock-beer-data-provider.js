
/**
 * Mock provider for beer data. In a real world application this would be retrieved from a DB or web service.
 */
module.exports = class BeerDataProvider {

    /**
     * Returns the min and max temp for a specific beer type
     */
    fetchBeerInfoFor(beerType) {
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