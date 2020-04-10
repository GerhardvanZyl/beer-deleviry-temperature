import { Observable } from 'rxjs';
import { TruckContents } from '../model/truck-contents';

export interface ITruckService {
    contents(): Observable<TruckContents>;
}
