import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AddPlayerWarningComponent } from '../add-player-warning/add-player-warning.component';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: any;

  shot: any;

  constructor(private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    
    this.shot = onSnapshot(this.setGamesRef(), (list) => {
      list.forEach(element => {
        console.log(element.data());
        
      });
    });

  }

  setGamesRef() {
    return collection(this.firestore, 'games')
  }

  ngOnDestroy() {
    this.shot();
  }


  newGame() {
    this.game = new Game();
  }

  calculateTopStyle(index: number): { [key: string]: string } {
    let playerTop = 100;
    if (window.matchMedia("(max-width: 500px)").matches) {
      playerTop = 70;
    }
    const topPosition = (index * playerTop) + 'px';

    return { 'top': topPosition };
  }

  takeCard() {
    if (this.noAnimationAndEnteredPlayers()) {
      this.getRandomCard();
      this.setCurrentPlayer();

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    } else {
      this.openWarningDialog();
    }
  }

  noAnimationAndEnteredPlayers() {
    return !this.pickCardAnimation && this.game.players.length >= 2;
  }

  getRandomCard() {
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    this.game.playedCards.push(this.currentCard);
  }

  setCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    if (this.game.players.length <= 3) {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);

      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
        }
      });
    }
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(AddPlayerWarningComponent);
  }
}