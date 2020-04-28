import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { TruckContents } from 'src/app/model/truck-contents';
import { TruckService } from 'src/app/services/truck.service';
import { Container } from '../../model/container';

@Component({
    selector: 'app-truck-contents',
    templateUrl: './truck-contents.component.html',
    styleUrls: ['./truck-contents.component.less'],
})
export class TruckContentsComponent implements OnInit {

    public truckContents: Container[] = [];

    constructor(private truckService: TruckService) { }

    ngOnInit(): void {
        this.populate();

        setInterval(() => {
            this.updateTemperatures();
        }, 2500);
    }

    private populate(): void {
        this.truckService.contents().subscribe(
            (data: Container[]) => {
                for (const containerData of data) {
                    this.truckContents.push({
                        beerName: containerData.beerName,
                        containerId: containerData.containerId,
                        minTemp: containerData.minTemp,
                        maxTemp: containerData.maxTemp,
                        temperature: containerData.temperature
                    } as Container);
                }
            },
            error => console.error(error) // Should render error in an error handling or status component
        );
    }

    private updateTemperatures(): void {
        // If the truckContents don't exist yet, do nothing until it does.
        // The alternative to this check is to set the interval in the subscribe callback of populate
        // but this way the init is more readable.
        if (this.truckContents.length <= 0) {
            const ids = this.truckContents.map(container => container.containerId);

            this.truckService.temperatures(ids).subscribe(
                temperatures => {
                    this.truckContents = this.truckContents.map(container => {
                        const temp = temperatures.find(temperature => container.containerId === temperature.id);

                        return {
                            containerId: container.containerId,
                            temperature: temp.temperature,
                            minTemp: container.minTemp,
                            maxTemp: container.maxTemp,
                            beerName: container.beerName
                        } as Container;
                    });
                }
            );
        }
    }
}

