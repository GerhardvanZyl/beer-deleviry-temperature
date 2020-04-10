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
            // JSON.parse is faster than creating an object literal
            observer.next(JSON.parse(`[
                {
                    "containerId": 1,
                    "maxTemp": 6,
                    "minTemp": 4,
                    "position": "front-left",
                    "temperature": 5,
                    "type": "Pilsner"
                },
                {
                    "containerId": 2,
                    "maxTemp": 6,
                    "minTemp": 5,
                    "position": "front-middle",
                    "temperature": 0,
                    "type": "IPA"
                },
                {
                    "containerId": 3,
                    "maxTemp": 7,
                    "minTemp": 4,
                    "position": "front-right",
                    "temperature": 3,
                    "type": "Lager"
                },
                {
                    "containerId": 4,
                    "maxTemp": 8,
                    "minTemp": 6,
                    "position": "middle-left",
                    "temperature": 1,
                    "type": "Stout"
                },
                {
                    "containerId": 5,
                    "maxTemp": 5,
                    "minTemp": 3,
                    "position": "middle-center",
                    "temperature": 4,
                    "type": "Wheat Beer"
                },
                {
                    "containerId": 6,
                    "maxTemp": 6,
                    "minTemp": 4,
                    "position": "middle-right",
                    "temperature": 2,
                    "type": "Pale Ale"
                }
            ]`));
        });
    }
}
