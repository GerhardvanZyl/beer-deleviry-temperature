import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITruckService } from './i-truck-service';
import { TruckService } from './truck.service';
import { SimTruckService } from './simulators/truck.service.sim';
import { Injectable, InjectionToken } from '@angular/core';

let truckServiceFactory = (http: HttpClient) => {
    
    console.log("getting service: ", environment.mode === "isolated" )
    
    return environment.mode === "isolated" 
    ? new SimTruckService(http) 
    : new TruckService(http);
}

export let TruckServiceToken = new InjectionToken<ITruckService>('ITruckService');

export let TruckServiceProvider = {
    provide: TruckServiceToken,
    useFactory: truckServiceFactory,
    deps: [
        HttpClient
    ]
}