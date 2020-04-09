import {Component, OnInit, Input, Output} from '@angular/core';
import { Container } from 'src/app/model/container';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {
    @Input() 
    public container: Container;

    @Output()
    public beerName: string;

    @Output()
    public minTemp: number;

    @Output()
    public maxTemp: number;
    
    ngOnInit(): void {

    }

    constructor(){
        this.beerName = this.container.type;
        this.minTemp = this.container.minTemp;
        this.maxTemp = this.container.maxTemp;
    }

}