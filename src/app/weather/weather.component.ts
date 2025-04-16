import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (this.city.trim()) {
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          this.weatherData = data;
        },
        error => {
          console.error('Error fetching weather data', error);
          alert('Could not fetch weather data. Please try again.');
        }
      );
    }
  }
}
