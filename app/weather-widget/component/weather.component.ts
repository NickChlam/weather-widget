import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../Service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';


declare var Skycons: any;


@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]

})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "mph";
    currentTempUnit = "F";
    currentLocation = "";
    icons = new Skycons();
    dataRecieved = false;

    constructor(private service: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();

    }
    getCurrentLocation() {
        this.service.getCurrentLoction()
            .subscribe(position => {
                this.pos = position
                this.getCurrentWeather();
                this.getLocationName();

            },
            err => console.error(err));
    }
    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                    this.weatherData.summary = weather["currently"]["summary"],
                    this.weatherData.wind = weather["currently"]["windSpeed"],
                    this.weatherData.humidity = weather["currently"]["humidity"],
                    this.weatherData.icon = weather["currently"]["icon"]
                console.log("Weather: ", this.weatherData); // remove me 
                this.setIcon();
                this.dataRecieved = true;
            },
            err => console.error(err));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location); // TO DO REMOVE
                this.currentLocation = location["results"][3]["formatted_address"];
                console.log("Name: ", this.currentLocation); // remove 
            });
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits() {
        if (this.currentTempUnit == "F") {
            this.currentTempUnit = "C";
        } else {
            this.currentTempUnit = "F";
        }
    }

    toggleSpeedUnits() {
        if (this.currentSpeedUnit == "mph") {
            this.currentSpeedUnit = "kph";
        } else {
            this.currentSpeedUnit = "mph";
        }
    }

    setIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object {
        if (this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
             this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
};