const TemperatureDataProvider = require('../../providers/temperature-data-provider');
const ConfigurationService = require('../../services/mock-configuration-service');
const axios = require('axios');

let loggerMock = {
    logInfo: () => { },
    logWarning: () => { },
    logError: () => { }
};

// No need to mock the config service as it is already a mock
let configSvc = new ConfigurationService();

describe('TemperatureDataProvider', () => {

    let temperatureProvider;

    beforeEach(() => {
        temperatureProvider = new TemperatureDataProvider(loggerMock, configSvc);
    });

    it('should initialize', () => {
        expect(temperatureProvider).toBeDefined();
    });

    describe('getTemperatureFor', () => {
        it('should get the temperature of a specific container', () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 1, id: '1' }
            });

            let temp = temperatureProvider.getTemperatureFor('1').then(() => {
                expect(temp).toEqual(1);
            });
        });
    });

    describe('getTemperatures', () => {
        it('should get the temperature of multiple containers', () => {
            let count = 0;
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 10 + count++, id: (++count).toString() }
            });

            let temp = temperatureProvider.getTemperatures(['1', '2', '3']).then(() => {

                expect(temp[0].temperature).toEqual(10);
                expect(temp[1].temperature).toEqual(11);
                expect(temp[2].temperature).toEqual(12);

                expect(temp[0].id).toEqual(1);
                expect(temp[1].id).toEqual(2);
                expect(temp[2].id).toEqual(3);

            });
        });
    });

});