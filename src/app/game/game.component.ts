import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importieren des CommonModules

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule], // Hinzufügen von CommonModule
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  cards = [0, 1, 2, 3, 4];
}
