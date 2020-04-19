import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {

    let containerData;
    let fixture;
    let component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ContainerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;

        containerData = {
            temperature: 1,
            minTemp: 3,
            maxTemp: 5,
            beerName: 'Pilsner'
        };

        component.container = containerData;

        fixture.detectChanges();
    }));

    afterEach(() => {
        fixture.destroy();
    });

    describe('isTempCorrect', () => {
        it('should return false if the temperature is too high', () => {
            containerData.temperature = 10;
            expect(component.isTempCorrect).toEqual(false);
        });

        it('should return false if the temperature is too low', () => {
            containerData.temperature = 1;
            expect(component.isTempCorrect).toEqual(false);
        });

        it('should return true if the temperature is just right', () => {
            containerData.temperature = 4;
            expect(component.isTempCorrect).toEqual(true);
        });

        it('should return true if the temperature the same as the minimum temperature', () => {
            containerData.temperature = 3;
            expect(component.isTempCorrect).toEqual(true);
        });

        it('should return true if the temperature the same as the maximum temperature', () => {
            containerData.temperature = 5;
            expect(component.isTempCorrect).toEqual(true);
        });
    });
});
