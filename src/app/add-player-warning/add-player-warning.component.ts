import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-player-warning',
  templateUrl: './add-player-warning.component.html',
  styleUrls: ['./add-player-warning.component.scss']
})
export class AddPlayerWarningComponent {
  addPlayer: any = false;

  constructor(public dialogRef: MatDialogRef<AddPlayerWarningComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
