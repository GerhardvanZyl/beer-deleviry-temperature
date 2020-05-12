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
            
            jsonSpy = jest.spyOn(res, 'json').mockImplementation((param)=>{
                resultJson = param;
            });
        });

        afterEach(()=>{
            resultJson = null;
            jsonSpy = null;
        });

        it('should return information about the current truck contents.', async () => {
            
            await _truckController.getContent(req, res);
            expect(resultJson).toBeDefined();
            expect(jsonSpy).toHaveBeenCalled();
        });

        it('should contain the temperature and type of beer and ideal temperatures of each container.', async () => {
            
            await _truckController.getContent(req, res);

            for ( let i = 0; i < resultJson.length; i++) {
                
                let result = resultJson[i];

                expect(result.containerId).toEqual((i+1).toString());
                expect(result.temperature).toEqual(i+1);
                expect(result.beerName).toBeDefined();
                expect(result.minTemp).toBeDefined();
                expect(result.maxTemp).toBeDefined();
            }
        });

        it('should set the isInRange flag to false if the temperature falls out of the acceptable range.', async () => {
            
            await _truckController.getContent(req, res);

            for ( let i = 0; i < resultJson.length; i++) {
                
                let result = resultJson[i];

                expect(result.minTemp).toBeDefined();
                expect(result.maxTemp).toBeDefined();

                if(result.temperature <= result.maxTemp && result.temperature >= result.minTemp ){
                    expect(result.isInRange).toBe(true);
                } else {
                    expect(result.isInRange).toBe(false);
                }
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
