import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
  standalone: true,
  imports: [
    IonicModule, RouterModule, CommonModule  
  ]
})
export class ForecastPage implements OnInit {
  forecast = {
    city: 'Galway',
    temperature: 8,
    condition: 'Partly Cloudy',
  };

  constructor() { }

  ngOnInit() {
  }

}
