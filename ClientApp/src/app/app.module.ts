import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruckContentsComponent } from './ui-components/tuck-contents/truck-contents.component';
import { TruckService } from './services/truck.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContainerComponent } from './ui-components/container/container.component';
import { SimTruckService } from './services/simulators/truck.service.sim';

@NgModule({
  declarations: [
    AppComponent,
    TruckContentsComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TruckService,
    SimTruckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
