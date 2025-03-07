import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule for *ngFor
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) { }

  allProfilePictures = ['avatar.png', 'female.jpg'];

  closeDialog(selectedPicture: string) {
    this.dialogRef.close(selectedPicture);
  }
}
