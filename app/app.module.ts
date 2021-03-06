import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import {JsonpModule, HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component'

import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';
import { tempUnit } from './weather-widget/pipe/temp-unit';

@NgModule({
    imports: [ BrowserModule, JsonpModule, HttpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe, tempUnit ],
    bootstrap: [ AppComponent]
})

export class AppModule { }


