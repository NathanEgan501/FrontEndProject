import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],  // Make sure FormsModule is imported here
})
export class ForecastPage implements OnInit {
  city: string = '';
  weatherData: any = null;
  loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.loadLastSearchedCity();
  }

  async loadLastSearchedCity() {
    const savedCity = await this.storage.get('preferredCity');
    if (savedCity) {
      this.city = savedCity;
      this.getWeather();
    }
  }

  async getWeatherByLocation() {
    try {
      this.loading = true;
      const position = await this.getCurrentPosition();
      this.weatherService.getWeatherByLocation(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.weatherData = data;
          this.loading = false;
        }, error => {
          this.loading = false;
          this.presentToast('Failed to fetch weather by location');
        });
    } catch (error) {
      this.loading = false;
      this.presentToast('Location access denied or unavailable.');
    }
  }

  getWeather() {
    if (!this.city) {
      this.presentToast('Please enter a city');
      return;
    }

    this.loading = true;
    this.weatherService.getWeatherByCity(this.city).subscribe(
      data => {
        this.weatherData = data;
        this.loading = false;
        this.storage.set('preferredCity', this.city);  // Save the city to storage
      },
      error => {
        this.loading = false;
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
