export class Game {
    public players: string[] = []; //get players from different files
    public stack: string[] = []; //get cards
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push("spade_" + i);
            this.stack.push("hearts_" + i);
            this.stack.push("diamonds_" + i);
            this.stack.push("clubs_" + i);
        }

        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer
        }
    }
}

function shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}