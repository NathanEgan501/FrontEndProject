import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Provides Ionic UI components
import { CommonModule } from '@angular/common'; // Enables use of common Angular directives
import { RouterModule } from '@angular/router'; // Required for routing

@Component({
  selector: 'app-home',
  standalone: true, // Allows this component to be used without declaring it in a module
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage {
  constructor() {} 
}
