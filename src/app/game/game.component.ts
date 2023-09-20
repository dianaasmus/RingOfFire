import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AddPlayerWarningComponent } from '../add-player-warning/add-player-warning.component';
import { Firestore, onSnapshot, collection, addDoc, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { docData } from 'rxfire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: any;
  gameSubscription: any;

  shot: any;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      console.log(params["id"]);

      //Sammlung aus Firebase Datenbank
      const gamesCollection = collection(this.firestore, 'games');

      //Verweis auf bestimmtes Firebase Dokument mit jeweiligen id
      const gameDoc = doc(gamesCollection, params["id"]);

      //Abonnieren des Dokuments
      this.gameSubscription = onSnapshot(gameDoc, (gameSnapshot) => {

        //Daten aus den Dokumenten, die man in Firebase einsehen kann
        const gameData: any = gameSnapshot.data();

        //gameSnapshot: Firestore Dokument Daten (allg Daten. z. B. Metadaten)
        if (gameData) {

          console.log('Spiel aktualisiert:', gameData);

          //Daten aus dem Dokument laden:
          this.game.currentPlayer = gameData.currentPlayer;
          this.game.playedCards = gameData.playedCards;
          this.game.players = gameData.players;
          this.game.stack = gameData.stack;
        }
      });
    });
  }


  // Stelle sicher, dass du das Abonnement bei Bedarf trennst (z. B. im ngOnDestroy).
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