class PokerTable {
    constructor(room){
        let deck = [];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 13; j++){
                let cardName = '';
                switch (j) {
                    case 0:
                        cardName = '2 de '
                        break
                    case 1:
                        cardName = '3 de '
                        break
                    case 2:
                        cardName = '4 de '
                        break
                    case 3:
                        cardName = '5 de '
                        break
                    case 4:
                        cardName = '6 de '
                        break
                    case 5:
                        cardName = '7 de '
                        break
                    case 6:
                        cardName = '8 de '
                        break
                    case 7:
                        cardName = '9 de '
                        break
                    case 8:
                        cardName = '10 de '
                        break
                    case 9:
                        cardName = 'Valete de '
                        break
                    case 10:
                        cardName = 'Dama de '
                        break
                    case 11:
                        cardName = 'Rei de '
                        break
                    case 12:
                        cardName = 'Ás de '
                        break
                };
                switch (i) {
                    case 0:
                        cardName = cardName + 'paus.'
                        break
                    case 1:
                        cardName = cardName + 'espadas.'
                        break
                    case 2:
                        cardName = cardName + 'copas.'
                        break
                    case 3:
                        cardName = 'ouro.'
                        break
                };
                deck.push({
                    id: deck.length,
                    inDeck: true,
                    inTable: false,
                    playerId: null,
                    cardNumber: j,
                    cardNaipe: i,
                    cardName: cardName
                });
            };
        };
        this.room = room;
        this.players = room.players;
        this.isInRound = false;
        this.deck = deck;
        this.inTable = [];
    };
    pickOne(max) {
        let one = Math.floor(Math.random() * (max - 1));
        return one;
    }
    getDeck(){
        return this.deck;
    }
    getPlayers(){
        return this.players;
    }
    getRoom(){
        return this.room;
    }
    getIsInRound(){
        return this.isInRound;
    }
    startRound(){
        this.isInRound = true;
    }
    darCartas() {
        for (p in this.players) {
            for (let i = 0; i < 2; i++) {
                let cIdx = this.pickOne(this.deck.length - 1);
                console.log('cIdx:', cIdx, ' player: ', this.players[p].id, ' carta: ', this.deck[cIdx].cardName, ' cartas no deck antes de tirar essa: ', this.deck.length);
                this.deck[cIdx].inDeck = false;
                this.deck[cIdx].playerId = this.players[p].id;
                this.players[p].cartas.push(this.deck[cIdx]);
                this.deck.splice(cIdx, 1);
            };
        };
        for (let i = 0; i < 5; i++) {
            let cIdx = this.pickOne(this.deck.length - 1);
            console.log('carta na mesa: cIdx:', cIdx, ' carta: ', this.deck[cIdx].cardName, ' cartas no deck antes de tirar essa: ', this.deck.length);
            this.deck[cIdx].inDeck = false;
            this.deck[cIdx].inTable = true;
            this.inTable.push(this.deck[cIdx]);
            this.deck.splice(cIdx, 1);
        };
    };
};

export default PokerTable;