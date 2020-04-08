const TruckController = require('../../controllers/truck-controller');
const TruckDataProvider = require('../../providers/mock-truck-data-provider');
const TemperatureDataProvider = require('../../providers/temperature-data-provider');
const WebNotificationProvider = require('../../providers/notification-providers/web-notification-provider');
const BeerDataProvider = require('../../providers/mock-beer-data-provider');

describe('TruckController', () => {

    let truckDataProvider;
    let beerDataProvider;
    let temperatureDataProvider;
    let webNotificationProvider;

    // Due to the nature of logging providers, just hardcoding a mock is sufficient
    let loggerMock = {
        logInfo: () => { },
        logWarning: () => { },
        logError: () => { }
    };

    let response;

    let reqMock = {};
    let resMock = {
        json: (resp)=>{
            response = resp;
        }
    };

    beforeEach(() => {
        truckDataProvider = new TruckDataProvider(loggerMock);
        temperatureDataProvider = new TemperatureDataProvider(loggerMock);
        beerDataProvider = new BeerDataProvider(loggerMock);
        webNotificationProvider = new WebNotificationProvider(loggerMock);
    });

    afterEach(()=>{
        response = null;
    });

    it('should instantiate', () => {
        let truckController = new TruckController(loggerMock,
            webNotificationProvider,
            beerDataProvider,
            truckDataProvider,
            temperatureDataProvider
        );

        expect(truckController).toBeDefined();
    });

    describe('getContentInfo', () => {

        let truckController;

        beforeEach(() => {

            // Only temperatureDataProvider needs to be mocked, as the others are already mocked
            jest.spyOn(temperatureDataProvider, 'getContents').mockReturnValue([
                {id:1, temperature: 1},
                {id:2, temperature: 2},
                {id:3, temperature: 3},
                {id:4, temperature: 4},
                {id:5, temperature: 5},
                {id:6, temperature: 6}
            ]);

            truckController = new TruckController(loggerMock,
                webNotificationProvider,
                beerDataProvider,
                truckController,
                temperatureDataProvider
            );
          
        });

        it('should return the information about the truck content', ()=>{
            truckController.getContentInfo(reqMock, resMock);
            expect(response).toBeDefined();
        });

        describe('response details', () => {
            it('should return the current container temperature', ()=>{
                expect(response[0].temperature).toEqual(1);
                expect(response[1].temperature).toEqual(2);
                expect(response[2].temperature).toEqual(3);
                expect(response[3].temperature).toEqual(4);
                expect(response[4].temperature).toEqual(5);
                expect(response[5].temperature).toEqual(6);
            });

            it('should return the beer type',()=>{
                expect(response[0].type).toEqual('Pilsner');
                expect(response[1].type).toEqual('IPA');
                expect(response[2].type).toEqual('Lager');
                expect(response[3].type).toEqual('Stout');
                expect(response[4].type).toEqual('Wheat Beer');
                expect(response[5].type).toEqual('Pale Ale');
            });
        });
    });

});