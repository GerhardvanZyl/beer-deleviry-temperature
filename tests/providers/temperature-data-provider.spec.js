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
        it('should get the temperature of multiple containers', async () => {
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 10, id: 1 }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 11, id: 2 }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 12, id: 3 }
            });

            const temparatureGenerator = new TemperatureDataProvider()
                .fetchTemperatureFor(['1', '2', '3']);

            const temp = [];

            for await (let temperatureInfo of temparatureGenerator) {
                temp.push(temperatureInfo);
            }

            expect(temp[0].temperature).toEqual(10);
            expect(temp[1].temperature).toEqual(11);
            expect(temp[2].temperature).toEqual(12);

            expect(temp[0].id).toEqual(1);
            expect(temp[1].id).toEqual(2);
            expect(temp[2].id).toEqual(3);
        });

        it('should throw an exception if the ids arent specified', async () => {
            await expect(
                new TemperatureDataProvider().fetchTemperatureFor([]).next()
            )
                .rejects
                .toEqual('Argument exception - containerIds should be non-null and contain values.');
        });

        it('should throw an exception if there is an error connecting to the remote server', async () => {

            jest.spyOn(axios, 'get').mockRejectedValue(new Error('Server 500 error'));
            jest.spyOn(axios, 'all').mockRejectedValue(new Error('Server 500 error'));

            await expect(
                new TemperatureDataProvider().fetchTemperatureFor(['1']).next()
            )
                .rejects
                .toEqual('Error while attempting to fetch temperature data.');
        });
    });
});
