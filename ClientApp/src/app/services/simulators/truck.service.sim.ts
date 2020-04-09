import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TruckContents } from '../../model/truck-contents';
import { Observable } from 'rxjs';
import { ITruckService } from '../i-truck-service';

@Injectable()
export class SimTruckService implements ITruckService {

    constructor(private http: HttpClient) {
    }

    public contents(): Observable<TruckContents> {
        return new Observable<TruckContents>(observer => {
            observer.next(JSON.parse('[{"containerId":1,"type":"Pilsner","temperature":5,"minTemp":4,"maxTemp":6,"position":"front-left"},{"containerId":2,"type":"IPA","temperature":0,"minTemp":5,"maxTemp":6,"position":"front-middle"},{"containerId":3,"type":"Lager","temperature":3,"minTemp":4,"maxTemp":7,"position":"front-right"},{"containerId":4,"type":"Stout","temperature":1,"minTemp":6,"maxTemp":8,"position":"middle-left"},{"containerId":5,"type":"Wheat Beer","temperature":4,"minTemp":3,"maxTemp":5,"position":"middle-center"},{"containerId":6,"type":"Pale Ale","temperature":2,"minTemp":4,"maxTemp":6,"position":"middle-right"}]'));
        });
    }


}