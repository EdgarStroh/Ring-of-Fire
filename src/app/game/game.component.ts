import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  cards = [0, 1, 2, 3, 4];
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = '';

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      console.log(this.currentCard);
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playerCards.push(this.currentCard)
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  ngOnInit(): void {
    this.newGame();
  }
}
