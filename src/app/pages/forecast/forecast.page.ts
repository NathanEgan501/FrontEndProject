import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, HttpClientModule]
})
export class ForecastPage implements OnInit {
  city: string = '';
  weatherData: any = null;

  constructor(private weatherService: WeatherService, private toastController: ToastController) {}

  ngOnInit() {
    this.getWeatherByLocation();
  }

  async getWeatherByLocation() {
    try {
      const position = await this.getCurrentPosition();
      this.weatherService.getWeatherByLocation(position.coords.latitude, position.coords.longitude) // <-- Fixed this line
        .subscribe(data => {
          this.weatherData = data;
        });
    } catch (error) {
      this.presentToast('Location access denied or unavailable.');
    }
  }

  getWeather() {
    if (!this.city) {
      this.presentToast('Please enter a city');
      return;
    }

    this.weatherService.getWeatherByCity(this.city).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        this.presentToast('City not found.');
      }
    );
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
  
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
