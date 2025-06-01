import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router'; // ⬅️ Assure-toi que tout est importé
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Virgule ici
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ]
}).catch(err => console.error(err));




// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
// import { routes } from './app/app.routes';

// bootstrapApplication(AppComponent, {
//   providers: [
//     // Preload tous les modules pour éviter les délais de chargement
//     provideRouter(routes, withPreloading(PreloadAllModules)),
//     // Autres providers...
//   ]
// }).catch(err => console.error(err));
















// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, appConfig);
