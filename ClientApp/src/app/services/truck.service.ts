import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TruckContents } from '../model/truck-contents';
import { Observable } from 'rxjs';

@Injectable()
export class TruckService{

    private truckContentsUrl = 'http://localhost:3000/truck/contentinfo';

    constructor(private http: HttpClient){
    }

    public fetchTruckContents(): Observable<TruckContents>{
        return this.http.get<TruckContents>(this.truckContentsUrl);
    }

    
}