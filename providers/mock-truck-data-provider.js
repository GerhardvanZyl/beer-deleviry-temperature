
/**
 * Mock provider for truck data. In a real world application this would be retrieved from a DB or web service.
 */
module.exports = class MockTruckDataProvider {

    constructor(logger) {
        this._logger = logger;
    }

    /**
    * Returns a list of beer containers in the truck
    * At the moment there is only one truck. In future could be expanded to take a truckId as argument
    */
    fetchContent() {

        // JSON.parse() is faster than creating an object literal
        return JSON.parse(`[
          {
            "id": 1,
            "type": "Pilsner"
          },
          {
            "id": 2,
            "type": "IPA"
          },
          {
            "id": 3,
            "type": "Lager"
          },
          {
            "id": 4,
            "type": "Stout"
          },
          {
            "id": 5,
            "type": "Wheat Beer"
          },
          {
            "id": 6,
            "type": "Pale Ale"
          }
        ]`);
    }
};