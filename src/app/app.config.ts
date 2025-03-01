import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// 🔹 Deine Routen
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

// 🔥 Firebase-Module importieren
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// 🔥 Firebase-Konfiguration importieren
import { environment } from '../environments/environment';

const routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game', component: GameComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),

    // 🔥 Firebase-Integration
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
