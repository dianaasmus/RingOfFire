import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: any; //type Game

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game(); //variable bekommt ein neues Objekt ertsellt, von der game.ts datei
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); // Hier verwenden wir "!" für den Non-null Assertion Operator
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe();
  }
}
