const _truckController = require('../../controllers/truck-controller');
const axios = require('axios');

describe('truckController', () => {

    describe('getContent', () => {

        const req = {};
        const res = {
            json: ()=>{}
        };

        let jsonSpy;
        let resultJson;

        beforeEach(()=>{
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 10, id: '1' }
            });
            
            jsonSpy = jest.spyOn(res, 'json').mockImplementation((param)=>{
                resultJson = param;
            });
        });

        it('should return information about the current truck contents.', async () => {
            
            await _truckController.getContent(req, res);
            expect(resultJson).toBeDefined();
            expect(jsonSpy).toHaveBeenCalled();
        });

        it('should contain the temperature and type of beer and ideal temperatures of each container', async () => {
            
            await _truckController.getContent(req, res);

            for (let result of resultJson) {

                expect(result.temperature).toBeDefined();
                expect(result.beerName).toBeDefined();
                expect(result.minTemp).toBeDefined();
                expect(result.maxTemp).toBeDefined();
            }
        });

    });

    describe('getTemperatures', () => {

        let resultJson;

        const req = {
            query: {
                beerIds: '1,2,3'
            }
        };
        const res = {
            json: ()=>{},
            status: ()=>{}
        };

        beforeEach(()=>{
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 10, id: '1' }
            });
            
            jest.spyOn(res, 'json').mockImplementation((param)=>{
                resultJson = param;
            });
        });

        it('should return the temperatures for the requested ids', async () => {
            
            await _truckController.getTemperatures(req, res);
            expect(resultJson).toBeDefined();
            expect(resultJson[0].id).toEqual('1');
            expect(resultJson[0].temperature).toEqual(10);
        });
        
    });
});
