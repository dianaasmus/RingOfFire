import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AddPlayerWarningComponent } from '../add-player-warning/add-player-warning.component';
import { Firestore, onSnapshot, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { docData } from 'rxfire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: any;
  gameSubscription: any;
  gameId: any;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.subParams();
  }

  async saveGame() {
    if (this.gameId) {
      const gamesCollection = collection(this.firestore, 'games');
      const gameDoc = doc(gamesCollection, this.gameId);
      await updateDoc(gameDoc, this.game.toJson()).catch(
        (err) => { console.error(err); }
      );
    }
  }

  subParams() {
    this.route.params.subscribe((params) => {
      this.gameId = params["id"];
      this.subscribeToGameChanges();
    });
  }

  subscribeToGameChanges(): void {
    const gamesCollection = collection(this.firestore, 'games');
    const gameDoc = doc(gamesCollection, this.gameId);

    this.gameSubscription = onSnapshot(gameDoc, this.handleGameSnapshot.bind(this));
  }

  handleGameSnapshot(gameSnapshot: any): void {
    const gameData: any = gameSnapshot.data();
    if (gameData) {
      this.setGameData(gameData);
    }
  }

  setGameData(gameData: any) {
    this.game.currentPlayer = gameData.currentPlayer;
    this.game.playedCards = gameData.playedCards;
    this.game.players = gameData.players;
    this.game.stack = gameData.stack;
    this.game.pickCardAnimation = gameData.pickCardAnimation;
    this.game.currentCard = gameData.currentCard
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription();
    }
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
      this.saveGame();

      setTimeout(() => {
        this.game.pickCardAnimation = false;
      }, 1000);
    } else {
      this.openWarningDialog();
    }
  }

  noAnimationAndEnteredPlayers() {
    return !this.game.pickCardAnimation && this.game.players.length >= 2;
  }

  getRandomCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.playedCards.push(this.game.currentCard);
    this.saveGame();
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
          this.saveGame();
        }
      });
    }
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(AddPlayerWarningComponent);
  }
}