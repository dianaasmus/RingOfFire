import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: any; //type Game

  constructor() { }

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
      console.log(this.game);

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
