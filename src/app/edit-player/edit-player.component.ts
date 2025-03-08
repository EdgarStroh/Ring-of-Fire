import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,],  // Import CommonModule for *ngFor
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }
  name: string = '';
  allProfilePictures = ['avatar.png', 'female.jpg'];

  closeDialog(selectedPicture: string) {
    this.dialogRef.close(selectedPicture);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
