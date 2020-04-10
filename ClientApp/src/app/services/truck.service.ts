import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TruckContents } from '../model/truck-contents';
import { Observable } from 'rxjs';
import { ITruckService } from './i-truck-service';

@Injectable()
export class TruckService implements ITruckService {

    private truckContentsUrl = 'http://localhost:3000/api/truck/contentinfo';

    constructor(private http: HttpClient) {
    }

    public contents(): Observable<TruckContents> {
        return this.http.get<TruckContents>(this.truckContentsUrl);
    }
}
