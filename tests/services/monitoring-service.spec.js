const MonitoringService = require('../../services/monitoring-service');
const MockTruckDataProvider = require('../../providers/mock-truck-data-provider');
const TemperatureDataProvider = require('../../providers/temperature-data-provider');
const ConfigurationService = require('../../services/mock-configuration-service');
const BeerDataProvider = require('../../providers/mock-beer-data-provider');

describe('monitoringService', () => {

    let monitoringService;
    let truckDataProvider;
    let beerDataProvider;
    let temperatureDataProvider;

    // Due to the nature of logging providers, just hardcoding a mock is sufficient
    let loggerMock = {
        logInfo: () => { },
        logWarning: () => { },
        logError: () => { }
    };

    let configSvc = new ConfigurationService();

    beforeEach(() => {
        truckDataProvider = new MockTruckDataProvider(loggerMock);
        temperatureDataProvider = new TemperatureDataProvider(loggerMock);
        beerDataProvider = new BeerDataProvider(loggerMock);
    });

    it('should instantiate', () => {
        monitoringService = new MonitoringService(loggerMock, configSvc, truckDataProvider, beerDataProvider, temperatureDataProvider);
        expect(monitoringService).toBeDefined();
    });

    describe('populateBeerInfo', () => {
        it('should populate the beer info object', () => {
            monitoringService = new MonitoringService(loggerMock, configSvc, truckDataProvider, beerDataProvider, temperatureDataProvider);
            monitoringService.populateBeerInfo();

            expect(monitoringService._beerTypeInfo).toBeDefined();

            // since we use a mock provider, we can just check it now. For an actual app I would add a mock for this.
            expect(monitoringService._beerTypeInfo.Pilsner.minTemp).toBe(4);
        });
    });

    describe('checkTemperature', () => {
        it('should check the temperature of each container', () => {

            const getTemperatureSpy = jest.spyOn(temperatureDataProvider, 'getTemperatureFor').mockReturnValue({ // hacky promise mock
                then: callback => {
                    callback('1');
                    return {
                        catch: () => { }
                    };
                }
            });
            monitoringService = new MonitoringService(loggerMock, configSvc, truckDataProvider, beerDataProvider, temperatureDataProvider);
            monitoringService.populateBeerInfo();
            monitoringService.checkTemperature({
                'id': 1,
                'position': 'front-left',
                'type': 'Pilsner'
            });
            expect(getTemperatureSpy).toHaveBeenCalled();
        });

        it('should send a notification if the temperature is lower than the minimum', () => {

            const getTemperatureSpy = jest.spyOn(temperatureDataProvider, 'getTemperatureFor').mockReturnValue({ // hacky promise mock
                then: callback => {
                    callback('1');
                    return {
                        catch: () => { }
                    };
                }
            });

            monitoringService = new MonitoringService(loggerMock, configSvc, truckDataProvider, beerDataProvider, temperatureDataProvider);
            monitoringService.populateBeerInfo();

            let notified = false;
            monitoringService.register({
                notify: () => {
                    notified = true;
                }
            });

            monitoringService.checkTemperature({
                'id': 1,
                'position': 'front-left',
                'type': 'Pilsner'
            });
            expect(notified).toEqual(true);
            expect(getTemperatureSpy).toHaveBeenCalled();
        });

        it('should send a notification if the temperature is higher than the maximum', () => {

            const getTemperatureSpy = jest.spyOn(temperatureDataProvider, 'getTemperatureFor').mockReturnValue({ // hacky promise mock
                then: callback => {
                    callback('10');
                    return {
                        catch: () => { }
                    };
                }
            });

            monitoringService = new MonitoringService(loggerMock, configSvc, truckDataProvider, beerDataProvider, temperatureDataProvider);
            monitoringService.populateBeerInfo();

            let notified = false;
            monitoringService.register({
                notify: () => {
                    notified = true;
                }
            });

            monitoringService.checkTemperature({
                'id': 1,
                'position': 'front-left',
                'type': 'Pilsner'
            });
            expect(notified).toEqual(true);
            expect(getTemperatureSpy).toHaveBeenCalled();
        });

    });
});