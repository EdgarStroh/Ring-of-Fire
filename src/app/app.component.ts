import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>; // Observable für die Daten aus Firestore

  constructor() {
    const aCollection = collection(this.firestore, 'games'); // Firestore Collection referenzieren
    this.items$ = collectionData(aCollection); // Daten aus der Collection abrufen
  
    this.items$.subscribe(data => {
      console.log('Firestore Daten:', data); 
    });
  }
  
  
}
