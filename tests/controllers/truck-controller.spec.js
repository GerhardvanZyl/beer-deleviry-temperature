const _truckController = require('../../controllers/truck-controller');
const axios = require('axios');
const request = require('supertest');
const server = require('../../app');

describe('truckController', () => {

    describe('getContent', () => {

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 1, id: '1' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 2, id: '2' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 3, id: '3' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 4, id: '4' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 5, id: '5' }
            });
            jest.spyOn(axios, 'get').mockResolvedValueOnce({
                data: { temperature: 6, id: '6' }
            });
        });

        afterAll(() => {
            server.listener.close();
        });

        it('should contain the temperature and type of beer and ideal temperatures of each container.', async (done) => {
            const response = await request(server.app).get('/api/truck/content');

            for (let i = 0; i < response.body.length; i++) {

                let result = response.body[i];

                expect(result.containerId).toEqual((i + 1).toString());
                expect(result.temperature).toEqual(i + 1);
                expect(result.beerName).toBeDefined();
                expect(result.minTemp).toBeDefined();
                expect(result.maxTemp).toBeDefined();
            }

            done();
        });

        it('should set the isInRange flag to false if the temperature falls out of the acceptable range.', async (done) => {
            const response = await request(server.app).get('/api/truck/content');

            for (let i = 0; i < response.body.length; i++) {

                let result = response.body[i];

                expect(result.minTemp).toBeDefined();
                expect(result.maxTemp).toBeDefined();

                if (result.temperature <= result.maxTemp && result.temperature >= result.minTemp) {
                    expect(result.isInRange).toBe(true);
                } else {
                    expect(result.isInRange).toBe(false);
                }
            }

            done();
        });

    });

    describe('getTemperatures', () => {

        beforeEach(() => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 10, id: '1' }
            });
        });

        it('should return the temperatures for the requested ids', async (done) => {
            const response = await request(server.app).get('/api/truck/content?beerIds=1,2,3');
            const result = response.body;
            expect(result).toBeDefined();
            expect(result[0].containerId).toEqual('1');
            expect(result[0].temperature).toEqual(10);

            done();
        });

    });
});
