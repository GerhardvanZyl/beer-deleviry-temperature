import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { TruckContents } from 'src/app/model/truck-contents';
import { TruckService } from 'src/app/services/truck.service';

@Component({
    selector: 'app-truck-contents',
    templateUrl: './truck-contents.component.html',
    styleUrls: ['./truck-contents.component.less'],
})
export class TruckContentsComponent implements OnInit {

    public truckContents: TruckContents;

    constructor(private truckService: TruckService) {
    }

    ngOnInit(): void {
        this.populate();

        setInterval(() => {
            this.populate();
        }, 2500);
    }

    private populate(): void {
        this.truckService.contents().subscribe(
            data => this.truckContents = data,
            error => console.error(error) // Should render error in an error handling or status component
        );
    }
}

