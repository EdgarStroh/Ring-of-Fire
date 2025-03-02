import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: Firestore) { }

  async newGame() {
    try {
      const gamesCollection = collection(this.firestore, 'games'); // Collection referenzieren
      const docRef = await addDoc(gamesCollection, { ...new Game() }); // Neues Spiel erstellen
      console.log('Neues Spiel erstellt mit ID:', docRef.id);
      
      // 🏆 Mit ID zur Game-Seite navigieren
      this.router.navigateByUrl(`/game/${docRef.id}`);

    } catch (error) {
      console.error('Fehler beim Erstellen des Spiels:', error);
    }
  }
}
