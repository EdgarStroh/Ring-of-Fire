import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes = [
  { path: '', component: StartScreenComponent },
  
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
