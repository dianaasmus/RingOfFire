import { Component, OnInit } from '@angular/core';
import { Game } from '../modules/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  game: Game | undefined; //type Game

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game(); //variable bekommt ein neues Objekt ertsellt, von der game.ts datei
    console.log(this.game);
    
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
