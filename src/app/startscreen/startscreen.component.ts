import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../modules/game';


@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {

  }

  async newGame() {
    //neues Spiel erstellen
    let game = new Game();

    let newGameCollection = collection(this.firestore, 'games');

    //game als json in Datenbank hinzufügen
    await addDoc(newGameCollection, game.toJson())
    // .catch(
    //   (err) => {
    //     console.error(err);
    //   })
      .then((gameInfo: any) => {
        console.log(gameInfo.id);
        this.router.navigateByUrl('game/' + gameInfo.id);

      });

  }

}
