import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {

    let fixture;
    let component;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ContainerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
    }));

    afterEach(() => {
        fixture.destroy();
    });

    describe('isTempCorrect', () => {
        it('should return false if the temperature is too high', () => {
            let containerData = {
                temperature: 10,
                minTemp: 3,
                maxTemp: 5,
                beerName: 'Pilsner',
                isInRange: false
            };
    
            component.container = containerData;
    
            fixture.detectChanges();
            expect(component.isTempCorrect).toEqual(false);
        });

        it('should return false if the temperature is too low', () => {
            let containerData = {
                temperature: 1,
                minTemp: 3,
                maxTemp: 5,
                beerName: 'Pilsner',
                isInRange: false
            };
    
            component.container = containerData;
    
            fixture.detectChanges();
            expect(component.isTempCorrect).toEqual(false);
        });

        it('should return true if the temperature is just right', () => {
            let containerData = {
                temperature: 4,
                minTemp: 3,
                maxTemp: 5,
                beerName: 'Pilsner',
                isInRange: true
            };
    
            component.container = containerData;
    
            fixture.detectChanges();
            expect(component.isTempCorrect).toEqual(true);
        });

        it('should return true if the temperature the same as the minimum temperature', () => {
            let containerData = {
                temperature: 3,
                minTemp: 3,
                maxTemp: 5,
                beerName: 'Pilsner',
                isInRange: true
            };
    
            component.container = containerData;
    
            fixture.detectChanges();
            expect(component.isTempCorrect).toEqual(true);
        });

        it('should return true if the temperature the same as the maximum temperature', () => {
            let containerData = {
                temperature: 5,
                minTemp: 3,
                maxTemp: 5,
                beerName: 'Pilsner',
                isInRange: true
            };
    
            component.container = containerData;
    
            fixture.detectChanges();
            expect(component.isTempCorrect).toEqual(true);
        });
    });
});
