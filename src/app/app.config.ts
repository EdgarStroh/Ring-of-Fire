import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game', component: GameComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
