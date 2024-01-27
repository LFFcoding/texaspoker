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
    };
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
};

export default PokerTable;