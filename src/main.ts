import { bootstrapApplication } from '@angular/platform-browser';
import { PLATFORM_ID, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideStorage, Storage } from '@ionic/storage-angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    {
      provide: Storage,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return provideStorage(platformId, { name: '__mydb' });
      }
    }
  ],
});
