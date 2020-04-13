import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { TruckContents } from 'src/app/model/truck-contents';
import { TruckServiceToken } from 'src/app/services/truck-service-provider';
import { TruckServiceProvider } from 'src/app/services/truck-service-provider';
import { ITruckService } from 'src/app/services/i-truck-service';

@Component({
    selector: 'app-truck-contents',
    templateUrl: './truck-contents.component.html',
    styleUrls: ['./truck-contents.component.less'],
    providers: [TruckServiceProvider]
})
export class TruckContentsComponent implements OnInit {

    public truckContents: TruckContents;

    constructor(@Inject(TruckServiceToken) private truckService: ITruckService) {
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

