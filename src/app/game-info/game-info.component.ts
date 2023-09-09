import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone should keep drinking until the person who picked the card stops.' },
    { title: 'You', description: 'You decides who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the categroy.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance and adds a second one...' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Gang', description: 'Everyone drinks.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master till someone else picks a five' },
    { title: 'Men', description: 'All men drink!' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when someone breaks the rule.' },
  ];

  title: string = '';
  description: string = '';
  @Input() card: any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(): void { //void: methode wird nur ausgeführt und gibt nichts zurück
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
