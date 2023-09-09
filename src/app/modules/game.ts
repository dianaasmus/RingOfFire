export class Game {
    public players: string[] = []; //get players from different files
    public stack: string[] = []; //get cards
    public playedCard: string[] = [];
    public curentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push("spade_" + i);
            this.stack.push("hearts_" + i);
            this.stack.push("diamonds_" + i);
            this.stack.push("clubs_" + i);
        }

        shuffle(this.stack);
    }
}

function shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}