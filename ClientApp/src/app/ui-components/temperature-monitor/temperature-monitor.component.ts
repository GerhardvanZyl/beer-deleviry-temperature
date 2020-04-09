import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-temperature-monitor',
    templateUrl: './temperature-monitor.component.html',
    styleUrls: ['./temperature-monitor.component.less']
})
export class TemperatureMonitorComponent implements OnInit {
    @Input() 
    public temperature: number;
    
    @Input()
    public bint: string;

    ngOnInit(): void {
        console.log("binding: ", this.bint);
    }

    constructor(){
        
    }

}