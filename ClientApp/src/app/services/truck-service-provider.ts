import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITruckService } from './i-truck-service';
import { TruckService } from './truck.service';
import { SimTruckService } from './simulators/truck.service.sim';
import { Injectable, InjectionToken } from '@angular/core';

const truckServiceFactory = (http: HttpClient) => {

    return environment.mode === 'isolated'
        ? new SimTruckService(http)
        : new TruckService(http);
};

export const TruckServiceToken = new InjectionToken<ITruckService>('ITruckService');

export const TruckServiceProvider = {
    provide: TruckServiceToken,
    useFactory: truckServiceFactory,
    deps: [
        HttpClient
    ]
};
