import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular'; // Import Ionic modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // For two-way binding with ngModel
import { WeatherService } from '../../services/weather.service';  // Import the weather service to fetch data
import { Storage } from '@ionic/storage-angular';  // Import Storage to save the last city

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],  // Include necessary modules
})
export class ForecastPage implements OnInit {
  city: string = '';  // Initialize city string
  weatherData: any = null;  // Store weather data
  loading: boolean = false;  // Control loading spinner

  constructor(
    private weatherService: WeatherService,  // Inject weather service
    private toastController: ToastController,  // Inject toast for notifications
    private storage: Storage  // Inject storage service for storing last city
  ) {}

  ngOnInit() {
    this.loadLastSearchedCity();  // Attempt to load last searched city on initialization
  }

  // Load the last searched city from storage, if available
  async loadLastSearchedCity() {
    const savedCity = await this.storage.get('preferredCity');
    if (savedCity) {
      this.city = savedCity;
      this.getWeather();  // If city is found, fetch weather for that city
    }
  }

  // Fetch weather by location (using geolocation API)
  async getWeatherByLocation() {
    try {
      this.loading = true;  // Start loading spinner
      const position = await this.getCurrentPosition();  // Get the current position
      this.weatherService.getWeatherByLocation(position.coords.latitude, position.coords.longitude)
        .subscribe(data => {
          this.weatherData = data;  // Store the weather data
          this.loading = false;  // Stop loading spinner
        }, error => {
          this.loading = false;  // Stop loading spinner
          this.presentToast('Failed to fetch weather by location');  
        });
    } catch (error) {
      this.loading = false;  // Stop loading spinner
      this.presentToast('Location access denied or unavailable.'); 
    }
  }

  // Fetch weather for the entered city
  getWeather() {
    if (!this.city) {
      this.presentToast('Please enter a city');  
      return;
    }

    this.loading = true;  // Start loading spinner
    this.weatherService.getWeatherByCity(this.city).subscribe(
      data => {
        this.weatherData = data;  // Store the fetched weather data
        this.loading = false;  // Stop loading spinner
        this.storage.set('preferredCity', this.city);  // Save the city to storage for future use
      },
      error => {
        this.loading = false;  // Stop loading spinner
        this.presentToast('City not found.');  
      }
    );
  }

  // Helper function to get the current geolocation
  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),  // Resolve promise with position if successful
        (error) => reject(error)  // Reject promise if there is an error
      );
    });
  }

  // Helper function to present a toast notification
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,  // Message to display
      duration: 2000,  // Toast duration in ms
      color: 'danger'  // Set the toast color to red
    });
    toast.present();  // Display the toast
  }
}
