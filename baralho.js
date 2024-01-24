function pickOne(max) {
    let one = Math.floor(Math.random() * (max - 1));
    return one;
}

function darCartas(deck, players) {
    let d = deck;
    let pl = players;
    let deckList = [];
    let mesa = [];
    for (c in d) {
        let cardToList = d[c];
        let cardName = '';
        switch (cardToList.card) {
            case 1:
                cardName = "2 de"
                break
            case 2:
                cardName = "3 de"
                break
            case 3:
                cardName = "4 de"
                break
            case 4:
                cardName = "5 de"
                break
            case 5:
                cardName = "6 de"
                break
            case 6:
                cardName = "7 de"
                break
            case 7:
                cardName = "8 de"
                break
            case 8:
                cardName = "9 de"
                break
            case 9:
                cardName = "10 de"
                break
            case 10:
                cardName = "Valete de"
                break
            case 11:
                cardName = "Dama de"
                break
            case 12:
                cardName = "Rei de"
                break
            case 13:
                cardName = "Ás de"
                break
        };
        switch (cardToList.nipe) {
            case 0:
                cardName = cardName + " paus"
                break
            case 1:
                cardName = cardName + " espadas"
                break
            case 2:
                cardName = cardName + " copas"
                break
            case 3:
                cardName = cardName + " ouro"
                break
        }
        cardToList.cardName = cardName;
        deckList.push(cardToList);
    };

    //até aqui já está funcionando
    console.log("pre-deck: ", deckList);
    for (let i = 0; i < 2; i++) {
        for (p in pl) {
            let cIdx = pickOne((deckList.length - 1));
            d[deckList.indexOf(deckList[cIdx])].userId = pl[p].id;
            d[deckList.indexOf(deckList[cIdx])].inDeck = false;
            pl[p].cartas.push(deckList[cIdx]);
            deckList.splice(cIdx, 1);
        }
    };
    for (let i = 0; i < 2; i++) {
        let cIdx = pickOne((deckList.length - 1));
        mesa.push(deckList[cIdx]);
        d[deckList.indexOf(deckList[cIdx])].inTable = true;
        deckList.splice(cIdx, 1);
    };

    return d, pl, mesa;
};

let cards = {
    0: { id: 0, inDeck: true, userId: null, inTable: false, card: 1, nipe: 0 },
    1: { id: 1, inDeck: true, userId: null, inTable: false, card: 2, nipe: 0 },
    2: { id: 2, inDeck: true, userId: null, inTable: false, card: 3, nipe: 0 },
    3: { id: 3, inDeck: true, userId: null, inTable: false, card: 4, nipe: 0 },
    4: { id: 4, inDeck: true, userId: null, inTable: false, card: 5, nipe: 0 },
    5: { id: 5, inDeck: true, userId: null, inTable: false, card: 6, nipe: 0 },
    6: { id: 6, inDeck: true, userId: null, inTable: false, card: 7, nipe: 0 },
    7: { id: 7, inDeck: true, userId: null, inTable: false, card: 8, nipe: 0 },
    8: { id: 8, inDeck: true, userId: null, inTable: false, card: 9, nipe: 0 },
    9: { id: 9, inDeck: true, userId: null, inTable: false, card: 10, nipe: 0 },
    10: { id: 10, inDeck: true, userId: null, inTable: false, card: 11, nipe: 0 },
    11: { id: 11, inDeck: true, userId: null, inTable: false, card: 12, nipe: 0 },
    12: { id: 12, inDeck: true, userId: null, inTable: false, card: 13, nipe: 0 },
    13: { id: 13, inDeck: true, userId: null, inTable: false, card: 1, nipe: 1 },
    14: { id: 14, inDeck: true, userId: null, inTable: false, card: 2, nipe: 1 },
    15: { id: 15, inDeck: true, userId: null, inTable: false, card: 3, nipe: 1 },
    16: { id: 16, inDeck: true, userId: null, inTable: false, card: 4, nipe: 1 },
    17: { id: 17, inDeck: true, userId: null, inTable: false, card: 5, nipe: 1 },
    18: { id: 18, inDeck: true, userId: null, inTable: false, card: 6, nipe: 1 },
    19: { id: 19, inDeck: true, userId: null, inTable: false, card: 7, nipe: 1 },
    20: { id: 20, inDeck: true, userId: null, inTable: false, card: 8, nipe: 1 },
    21: { id: 21, inDeck: true, userId: null, inTable: false, card: 9, nipe: 1 },
    22: { id: 22, inDeck: true, userId: null, inTable: false, card: 10, nipe: 1 },
    23: { id: 23, inDeck: true, userId: null, inTable: false, card: 11, nipe: 1 },
    24: { id: 24, inDeck: true, userId: null, inTable: false, card: 12, nipe: 1 },
    25: { id: 25, inDeck: true, userId: null, inTable: false, card: 13, nipe: 1 },
    26: { id: 26, inDeck: true, userId: null, inTable: false, card: 1, nipe: 2 },
    27: { id: 27, inDeck: true, userId: null, inTable: false, card: 2, nipe: 2 },
    28: { id: 28, inDeck: true, userId: null, inTable: false, card: 3, nipe: 2 },
    29: { id: 29, inDeck: true, userId: null, inTable: false, card: 4, nipe: 2 },
    30: { id: 30, inDeck: true, userId: null, inTable: false, card: 5, nipe: 2 },
    31: { id: 31, inDeck: true, userId: null, inTable: false, card: 6, nipe: 2 },
    32: { id: 32, inDeck: true, userId: null, inTable: false, card: 7, nipe: 2 },
    33: { id: 33, inDeck: true, userId: null, inTable: false, card: 8, nipe: 2 },
    34: { id: 34, inDeck: true, userId: null, inTable: false, card: 9, nipe: 2 },
    35: { id: 35, inDeck: true, userId: null, inTable: false, card: 10, nipe: 2 },
    36: { id: 36, inDeck: true, userId: null, inTable: false, card: 11, nipe: 2 },
    37: { id: 37, inDeck: true, userId: null, inTable: false, card: 12, nipe: 2 },
    38: { id: 38, inDeck: true, userId: null, inTable: false, card: 13, nipe: 2 },
    39: { id: 39, inDeck: true, userId: null, inTable: false, card: 1, nipe: 3 },
    40: { id: 40, inDeck: true, userId: null, inTable: false, card: 2, nipe: 3 },
    41: { id: 41, inDeck: true, userId: null, inTable: false, card: 3, nipe: 3 },
    42: { id: 42, inDeck: true, userId: null, inTable: false, card: 4, nipe: 3 },
    43: { id: 43, inDeck: true, userId: null, inTable: false, card: 5, nipe: 3 },
    44: { id: 44, inDeck: true, userId: null, inTable: false, card: 6, nipe: 3 },
    45: { id: 45, inDeck: true, userId: null, inTable: false, card: 7, nipe: 3 },
    46: { id: 46, inDeck: true, userId: null, inTable: false, card: 8, nipe: 3 },
    47: { id: 47, inDeck: true, userId: null, inTable: false, card: 9, nipe: 3 },
    48: { id: 48, inDeck: true, userId: null, inTable: false, card: 10, nipe: 3 },
    49: { id: 49, inDeck: true, userId: null, inTable: false, card: 11, nipe: 3 },
    50: { id: 50, inDeck: true, userId: null, inTable: false, card: 12, nipe: 3 },
    51: { id: 51, inDeck: true, userId: null, inTable: false, card: 13, nipe: 3 }
};

let players = {
    leo: {
        id: 'leo',
        cartas: []
    },
    joao: {
        id: 'joao',
        cartas: []
    },
    gabriel: {
        id: 'leo',
        cartas: []
    },
    thuany: {
        id: 'leo',
        cartas: []
    }
};

let deckCards, pCards, mesa = darCartas(cards, players);

//console.log(darCartas(cards, leo, joao, gabriel, thuany));
console.log("cartas do baralho: ", deckCards, " cartas dos players: ", pCards, " cartas da mesa: ", mesa);