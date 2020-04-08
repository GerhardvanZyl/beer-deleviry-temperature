
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
    getContents() {

        // In theory we would receive the data from a DB or web service.
        // That data would probably not be in the exact format we need, so we would
        // create a new response object returning only what we need, in the format that
        // makes the most sense for the rest of the application, thereby decoupling
        // the application from any specific datasource.

        // JSON.parse() is faster than creating an object literal
        return JSON.parse(`[
          {
            "id": 1,
            "position": "front-left",
            "type": "Pilsner"
          },
          {
            "id": 2,
            "position": "front-middle",                             
            "type": "IPA"
          },
          {
            "id": 3,
            "position": "front-right",
            "type": "Lager"
          },
          {
            "id": 4,
            "position": "middle-left",
            "type": "Stout"
          },
          {
            "id": 5,
            "position": "middle-center",
            "type": "Wheat Beer"
          },
          {
            "id": 6,
            "position": "middle-right",
            "type": "Pale Ale"
          }
        ]`);
    }
};