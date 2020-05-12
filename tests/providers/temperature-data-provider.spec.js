const TemperatureDataProvider = require('../../providers/temperature-data-provider');
const axios = require('axios');

describe('TemperatureDataProvider', () => {

    let temperatureProvider;

    beforeEach(() => {
        temperatureProvider = new TemperatureDataProvider();
    });

    it('should initialize', () => {
        expect(temperatureProvider).toBeDefined();
    });

    describe('fetchTemperatureFor', () => {
        it('should get the temperature of multiple containers', () => {
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 10, id: '1' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 11, id: '2' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 12, id: '3' }
            });

            return temperatureProvider.fetchTemperatureFor(['1', '2', '3']).then((result) => {

                expect(result[0].temperature).toEqual(10);
                expect(result[1].temperature).toEqual(11);
                expect(result[2].temperature).toEqual(12);

                expect(result[0].id).toEqual('1');
                expect(result[1].id).toEqual('2');
                expect(result[2].id).toEqual('3');
            });
        });

        it('should throw an exception if the ids arent specified', async () => {
            await expect(
                temperatureProvider.fetchTemperatureFor([])
            )
                .rejects
                .toEqual('Argument exception - containerIds should be non-null and contain values.');
        });

        it('should throw an exception if there is an error connecting to the remote server', async () => {

            jest.spyOn(axios, 'get').mockRejectedValue(new Error('Server 500 error'));
            jest.spyOn(axios, 'all').mockRejectedValue(new Error('Server 500 error'));

            await expect(
                temperatureProvider.fetchTemperatureFor(['1'])
            )
                .rejects
                .toEqual('Error while attempting to fetch temperature data.');
        });
    });
});
