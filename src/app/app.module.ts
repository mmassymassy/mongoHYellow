import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { TemperatureComponent } from './temperature/temperature.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DeviceComponent,
    DashboardComponent,
    TemperatureComponent,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'device', component: DeviceComponent },
      { path: 'temperature', component: TemperatureComponent },

    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/