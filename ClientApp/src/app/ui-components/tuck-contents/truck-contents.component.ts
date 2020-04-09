import { Component, OnInit, Input } from '@angular/core';
import { TruckService } from '../../services/truck.service';
import { TruckContents } from 'src/app/model/truck-contents';

@Component({
    selector: 'app-truck-contents',
    templateUrl: './truck-contents.component.html',
    styleUrls: ['./truck-contents.component.less']
})
export class TruckContentsComponent implements OnInit {

    public temperature: number = 102;
    public truckContents: TruckContents;

    constructor(private _truckService: TruckService) {
    }

    ngOnInit(): void {
        this._truckService.fetchTruckContents().subscribe(
            data => this.truckContents = { ...data },
            error => console.error(error) // Should render error in an error handling or status component
        );
    }

    

}