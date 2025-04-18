import { bootstrapApplication } from '@angular/platform-browser';  // Launch the Angular app.
import { PLATFORM_ID, inject } from '@angular/core';  // Platform ID and inject function for platform detection.
import { provideHttpClient } from '@angular/common/http';  // Set up HTTP client for requests.
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';  // Router setup with preloading.
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';  // Ionic routing and core functionality.
import { provideStorage, Storage } from '@ionic/storage-angular';  // Set up local storage.
import { routes } from './app/app.routes';  // Import app routes configuration.
import { AppComponent } from './app/app.component';  // Root app component.

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  // Use Ionic's route reuse strategy.
    provideIonicAngular(),  // Provide Ionic core functionality.
    provideRouter(routes, withPreloading(PreloadAllModules)),  // Set up router with preloading.
    provideHttpClient(),  // Enable HTTP client for the app.
    {
      provide: Storage,  // Configure storage provider.
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);  // Inject platform ID.
        return provideStorage(platformId, { name: '__mydb' });  // Initialize storage with platform-specific settings.
      }
    }
  ],
});
