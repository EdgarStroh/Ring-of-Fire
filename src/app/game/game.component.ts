import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, doc, docData, setDoc, addDoc } from '@angular/fire/firestore'; 
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from "../game-info/game-info.component";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatDialogModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game: Game = new Game();
  gameId: string = '';  // ID des Spiels
  game$!: Observable<Game | undefined>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog, 
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    // Game-ID aus der URL holen
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.loadGame(); // Spiel aus Firestore laden
        this.game.currentPlayer= this.game.currentPlayer;
        this.game.playerCards= this.game.playerCards;
        this.game.players= this.game.players;
        this.game.stack= this.game.stack;
        this.game.pickCardAnimation= this.game.pickCardAnimation;
        this.game.currentCard= this.game.currentCard;
      } else {
        this.newGame(); // Neues Spiel erstellen
      }
    });
  }

  /**
   * Spiel aus Firestore laden und auf Änderungen hören
   */
  loadGame() {
    const gameRef = doc(this.firestore, `games/${this.gameId}`);
    this.game$ = docData(gameRef) as Observable<Game>; // Daten aus Firestore als Observable

    this.game$.subscribe((data) => {
      if (data) {
        this.game = data; // Spiel-Objekt aktualisieren
        console.log('Spiel-Daten aktualisiert:', this.game);
      }
    });
  }

  /**
   * Erstellt ein neues Spiel in Firestore
   */
  async newGame() {
    this.game = new Game(); // Neues Spielobjekt erstellen
    try {
      const gamesCollection = collection(this.firestore, 'games'); // Collection referenzieren
      const docRef = await addDoc(gamesCollection, { ...this.game }); // Spiel speichern
      console.log('Neues Spiel erstellt mit ID:', docRef.id);
      this.gameId = docRef.id; // ID speichern
      this.loadGame(); // Jetzt das neu erstellte Spiel laden
    } catch (error) {
      console.error('Fehler beim Erstellen des Spiels:', error);
    }
  }

  /**
   * Fügt einen Spieler hinzu und aktualisiert Firestore
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(async (name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        await this.updateGame(); // Firestore-Daten aktualisieren
      }
    });
  }
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      setTimeout(() => {
        this.game.playerCards.push(this.game.currentCard)
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 1000);
    }
  }

  /**
   * Aktualisiert das Spiel in Firestore
   */
  async updateGame() {
    if (!this.gameId) return;
    const gameRef = doc(this.firestore, `games/${this.gameId}`);
    try {
      await setDoc(gameRef, { ...this.game }, { merge: true }); // Bestehendes Spiel updaten
      console.log('Spiel aktualisiert:', this.game);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Spiels:', error);
    }
  }
}
