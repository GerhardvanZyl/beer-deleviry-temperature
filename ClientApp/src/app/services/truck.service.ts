import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temperature } from '../model/temperature';
import { Container } from '../model/container';

@Injectable()
export class TruckService {

    private truckContentsUrl = 'http://localhost:3000/api/truck/content';
    private truckTemperaturesUrl = 'http://localhost:3000/api/truck/temperature';

    constructor(private http: HttpClient) {
    }

    public contents(): Observable<Container[]> {
        return this.http.get<Container[]>(this.truckContentsUrl);
    }

    public temperatures(ids: string[]): Observable<Temperature[]> {
        return this.http.get<Temperature[]>(this.truckTemperaturesUrl + `?beerIds=${ids.join(',')}`);
    }
}
