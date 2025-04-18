import { Injectable } from '@angular/core';  // Import the Injectable decorator to make this service available for dependency injection.
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make HTTP requests to the OpenWeatherMap API.
import { Observable } from 'rxjs';  // Import Observable to represent the asynchronous data stream from HTTP requests.

@Injectable({
  providedIn: 'root'  // This makes the WeatherService available globally in the app.
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';  // URL for the OpenWeatherMap API.
  private apiKey = 'a31c5f9772e3148453db8a1bc19de496';  // API key for OpenWeatherMap API.

  constructor(private http: HttpClient) { }  // Inject HttpClient into the constructor for making HTTP requests.

  // Method to get weather data based on city name
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;  // Construct the URL to request weather data by city name.
    return this.http.get<any>(url);  // Make a GET request to the OpenWeatherMap API and return the result as an Observable.
  }

  // Method to get weather data based on latitude and longitude
  getWeatherByLocation(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;  // Construct the URL to request weather data by latitude and longitude.
    return this.http.get<any>(url);  // Make a GET request to the OpenWeatherMap API and return the result as an Observable.
  }
}
