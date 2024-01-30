const fs = require('fs');
class PokerTable {
    constructor(room) {
        this.room = room;
        this.players = room.players;
        this.isInRound = false;
        this.deck = [];
        this.inTable = [];
    };
    pickOne(max) {
        let one = Math.floor(Math.random() * (max - 1));
        return one;
    }
    getDeck() {
        return this.deck;
    }
    getPlayers() {
        return this.players;
    }
    getRoom() {
        return this.room;
    }
    getIsInRound() {
        return this.isInRound;
    }
    startRound() {
        this.isInRound = true;
    }
    gerarDeck() {
        let deck = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
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
                        cardName = cardName + 'ouro.'
                        break
                };
                deck.push({
                    cardName: cardName,
                    id: deck.length,
                    inDeck: true,
                    inTable: false,
                    playerId: null,
                    cardNumber: j,
                    cardNaipe: i
                });
            };
        };
        for (let p in this.players) {
            this.players[p].cartas = [];
        }
        this.inTable = [];
        this.deck = deck;
        let data = JSON.stringify(this.deck, null, 2);
        fs.writeFile('deck.json', data, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever arquivo:', err);
            } else {
                console.log('Deck salvo com sucesso em deck.json');
            }
        });
    };
    testeDeck() {
        for (let i = 0; i < this.deck.length; i++) {
            console.log('id da carta: ', this.deck[i].id, ' nome da Carta: ', this.deck[i].cardName);
        };
    };
    darCartas() {
        for (let p in this.players) {
            for (let i = 0; i < 2; i++) {
                let cIdx = this.pickOne(this.deck.length - 1);
                this.deck[cIdx].inDeck = false;
                this.deck[cIdx].playerId = this.players[p].id;
                this.players[p].cartas.push(this.deck[cIdx]);
                this.deck.splice(cIdx, 1);
            };
        };
        for (let i = 0; i < 5; i++) {
            let cIdx = this.pickOne(this.deck.length - 1);
            this.deck[cIdx].inDeck = false;
            this.deck[cIdx].inTable = true;
            this.inTable.push(this.deck[cIdx]);
            this.deck.splice(cIdx, 1);
        };
        let allCardsList = {};
        for (let p in this.players) {
            let pCardList = this.inTable.concat(this.players[p].cartas);
            allCardsList[`${this.players[p].id}`] = pCardList;
            for (let i = 0; i < 4; i++) {
                let flush = [];
                allCardsList[this.players[p].id].map((card) => {
                    if (card.cardNaipe == i) {
                        flush.push(card);
                    };
                });
                if (flush.length >= 5) {
                    console.log(allCardsList[this.players[p].id], ' ', this.players[p].id, 'fez flush!');
                    fizeramFlush.push(this.players[p].id);
                    fezFlush = true;
                };
            };
        };
    };
};

let fezFlush = false;
let fizeramFlush = [];

let room = {
    players: {
        0: {
            id: 'Leo',
            cartas: []
        },
        1: {
            id: 'Guilherme',
            cartas: []
        },
        2: {
            id: 'Gabriel',
            cartas: []
        },
        3: {
            id: 'Thuany',
            cartas: []
        }
    }
};

const table = new PokerTable(room);
//table.testeDeck();

let count = 0
while (fezFlush == false) {
    table.gerarDeck();
    table.darCartas();
    count = Number(count + 1);
};

//table.gerarDeck();
//table.darCartas();

if (fezFlush == true) {
    console.log('Rodadas até fazer flush: ', count);
} else {
    console.log('Fez porra de flush nenhum :(');
};