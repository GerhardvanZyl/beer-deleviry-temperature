import { Component, OnInit, Input, Output } from '@angular/core';
import { Container } from 'src/app/model/container';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.less']
})
export class ContainerComponent {
    @Input()
    public container: Container;

    public get isTempCorrect() {
        return this.container.isInRange;
    }
    constructor() {
    }
}
