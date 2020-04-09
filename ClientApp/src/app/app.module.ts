import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruckContentsComponent } from './ui-components/tuck-contents/truck-contents.component';
import { TemperatureMonitorComponent } from './ui-components/temperature-monitor/temperature-monitor.component';
import { TruckService } from './services/truck.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContainerComponent } from './ui-components/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckContentsComponent,
    TemperatureMonitorComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TruckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
