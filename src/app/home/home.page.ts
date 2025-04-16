import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Only IonicModule is necessary
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],  // Only include IonicModule here
})
export class HomePage {
  constructor() {}
}
