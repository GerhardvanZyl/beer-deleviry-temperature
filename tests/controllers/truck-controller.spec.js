const _truckController = require('../../controllers/truck-controller');
const axios = require('axios');

describe('truckController', () => {

    describe('getContent', () => {

        const req = {};
        const res = {
            json: ()=>{
            }
        };

        let jsonSpy;
        let resultJson;

        beforeEach(()=>{
            let count = 0;
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: { temperature: 10 + count++, id: (++count).toString() }
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
});
