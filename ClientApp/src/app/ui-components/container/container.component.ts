import { Component, OnInit, Input, Output } from '@angular/core';
import { Container } from 'src/app/model/container';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {
    @Input()
    public container: Container;

    public get isTempCorrect() {
        return this.container.temperature < this.container.minTemp
            || this.container.temperature > this.container.maxTemp
    }

    ngOnInit(): void {
    }

    constructor() {
    }

}