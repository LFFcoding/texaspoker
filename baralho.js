const fs = require('fs');

async function salve(obj, name) {

    let data = JSON.stringify(obj, null, 2);
    fs.writeFile(`${name}.json`, data, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever arquivo:', err);
        } else {
            console.log(`${name} salvo com sucesso em ${name}.json`);
        }
    });
}
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
    async gerarDeck() {
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

        //salva o deck em JSON
        //let data = JSON.stringify(this.deck, null, 2);
        //fs.writeFile('deck.json', data, 'utf8', (err) => {
        //    if (err) {
        //        console.error('Erro ao escrever arquivo:', err);
        //    } else {
        //        console.log('Deck salvo com sucesso em deck.json');
        //    }
        //});

    };
    testeDeck() {
        for (let i = 0; i < this.deck.length; i++) {
            console.log('id da carta: ', this.deck[i].id, ' nome da Carta: ', this.deck[i].cardName);
        };
    };
    darCartas() {
    //cartas aos players
        for (let p in this.players) {
            for (let i = 0; i < 2; i++) {
                let cIdx = this.pickOne(this.deck.length - 1);
                this.deck[cIdx].inDeck = false;
                this.deck[cIdx].playerId = this.players[p].id;
                this.players[p].cartas.push(this.deck[cIdx]);
                this.deck.splice(cIdx, 1);
            };
        };
        //cartas na mesa
        for (let i = 0; i < 5; i++) {
            let cIdx = this.pickOne(this.deck.length - 1);
            this.deck[cIdx].inDeck = false;
            this.deck[cIdx].inTable = true;
            this.inTable.push(this.deck[cIdx]);
            this.deck.splice(cIdx, 1);
        };
        let allCardsList = {};
        cartasJogo.jogadores = this.players;
        cartasJogo.mesa = this.inTable;

        //maior mão
        let m = {}
        for (let p in this.players) {
            m[this.players[p].id] = (2 ** (this.players[p].cartas[0].cardNumber)) + (2 ** (this.players[p].cartas[1].cardNumber));
        }
        let maiorValor = -1
        for (let p in m) {
            if (m[p] > maiorValor) {
                maiorValor = m[p]
                maiorMao = p
            }
        }

        //loop para a combinação de cartas da mesa com as cartas de cada jogador;
        for (let p in this.players) {
            let pCardList = this.inTable.concat(this.players[p].cartas);
            allCardsList[`${this.players[p].id}`] = pCardList;

            //verifica se tem flush;
            for (let i = 0; i < 4; i++) {
                let flush = [];
                allCardsList[this.players[p].id].map((card) => {
                    if (card.cardNaipe == i) {
                        flush.push(card);
                    };
                });
                if (flush.length >= 5) {
                    //console.log(allCardsList[this.players[p].id], ' ', this.players[p].id, 'fez flush!');
                    fizeramFlush.push(this.players[p].id);
                    fezFlush = true;

                    //verifica se tem straightFlush;
                    let straightFlush = [];
                    for (let i = 0; i < flush.length; i++) {
                        straightFlush.push(flush[i].cardNumber);
                    };
                    fezStraightFlush = this.verificaStraight(straightFlush);
                    if (fezStraightFlush === true) {
                        fizeramStraightFlush.push(this.players[p].id);
                        fizeramStraightFlush.push(allCardsList);
                    }

                    //let idList = [];
                    //for (let j = 0; j < 7; j++) {
                    //    idList.push(allCardsList[this.players[p].id][j].id);
                    //};
                    //let sortedCl = idList.sort((a, b) => a - b);
                    //let jaTem = false;
                    //combinations.map((c) => {
                    //    if (c === sortedCl) {
                    //        jaTem = true;
                    //    };
                    //});
                    //if (jaTem == false) {
                    //    combinations.push(sortedCl);
                    //};
                };
            };
            //se não fezStraightFlush, vê se fez quadra;
            //if (fezStraightFlush == false) {
            //verifica quadra;
            let cardNumbers = allCardsList[this.players[p].id].map((card) => {
                return card.cardNumber;
            }); // retorna somente os numeros das cartas de cada mesa+mão;
            //fezQuadra = this.verificaRepeticoes(cardNumbers, 4);
            //if (fezQuadra == true) {
            //    fizeramQuadra.push(this.players[p].id);
            //    fizeramQuadra.push(allCardsList);
            //};
            //}; //se não fezQuadra, vê se fez fullHouse;
            //fezFullHouse = this.verificaFullHouse(cardNumbers);
            //if (fezFullHouse == true) {
            //    fizeramFullHouse.push(this.players[p].id);
            //    fizeramFullHouse.push(allCardsList);
            //}; //se não fezFullHouse, vê se fez Straight;
            //fezStraight = this.verificaStraight(cardNumbers);
            //if (fezStraight === true) {
            //    fezStraight = true;
            //    fizeramStraight.push(this.inTable);
            //    fizeramStraight.push(this.players[p].id);
            //    fizeramStraight.push(allCardsList);
            //}; se não fez Straight, vê se fez trinca;
            //fezTrinca = this.verificaRepeticoes(cardNumbers, 3);
            //se não fez Trinca, vê se fez 2 pares;
            //fezDoisPares = this.verificaDoisPares(cardNumbers);
            //se não fez 2 pares, vê se fez 1 par;
            //fezPar = this.verificaRepeticoes(cardNumbers, 2);
            //se não tem par, vê quem tem mão maior;
        };
    };
    verificaRepeticoes(lista, quantidade) {
        // Criar um objeto de contagem para contar quantas vezes cada item aparece na lista
        let contagem = {};

        // Contar quantas vezes cada item aparece na lista
        for (let item of lista) {
            contagem[item] = (contagem[item] || 0) + 1;
        }

        // Verificar se alguma das contagens é maior ou igual a 4
        for (let chave in contagem) {
            if (contagem[chave] >= quantidade) {
                return true; // Repetição de 4 ou mais vezes encontrada
            }
        }

        return false; // Nenhuma repetição de 4 ou mais vezes encontrada
    }
    verificaFullHouse(lista) {
        // Criar um objeto de contagem para contar quantas vezes cada item aparece na lista
        let contagem = {};
        let fezTrincaNoFull = false;

        // Contar quantas vezes cada item aparece na lista
        for (let item of lista) {
            contagem[item] = (contagem[item] || 0) + 1;
        }

        // Verificar se alguma das contagens é maior ou igual a 4
        for (let chave in contagem) {
            if (contagem[chave] >= 3) {
                fezTrincaNoFull = true;
                for (let it in lista) {
                    if (lista[it] == chave) {
                        lista.splice(lista.indexOf(lista[it]), 1);
                    }
                }//trinca encontrada e retirada da lista
                break;
            }
        }
        let fezDuplaDoFull = this.verificaRepeticoes(lista, 2);
        if (fezTrincaNoFull && fezDuplaDoFull) {
            return true;
        }

        return false; // Nenhuma repetição de 4 ou mais vezes encontrada
    }
    verificaStraight(listaCardNumbers) {
        // Ordenar o array para garantir que os números estejam em ordem crescente
        listaCardNumbers.sort((a, b) => a - b);
        let lista = listaCardNumbers.filter((numero, index) => listaCardNumbers.indexOf(numero) === index);
        lista.sort((a, b) => a - b);

        // Percorra a lista de cartas e verifique se há uma sequência de 5 ou mais cartas consecutivas
        for (let i = 0; i <= lista.length - 5; i++) {
            let sequenciaEncontrada = true;
            for (let j = i; j < i + 4; j++) {
                if (lista[j + 1] - lista[j] !== 1) {
                    sequenciaEncontrada = false;
                    break;
                }
            }
            if (sequenciaEncontrada) {
                return true;
            }
        }
        return false; // Nenhuma sequência de 5 números consecutivos encontrada
    }
    verificaDoisPares(lista) {
        // Criar um objeto de contagem para contar quantas vezes cada item aparece na lista
        let contagem = {};
        let fez1Par = false;

        // Contar quantas vezes cada item aparece na lista
        for (let item of lista) {
            contagem[item] = (contagem[item] || 0) + 1;
        }

        // Verificar se alguma das contagens é maior ou igual a 4
        for (let chave in contagem) {
            if (contagem[chave] >= 2) {
                fez1Par = true;
                for (let it in lista) {
                    if (lista[it] == chave) {
                        lista.splice(lista.indexOf(lista[it]), 1);
                    }
                }//1par encontrado e retirado da lista
                break;
            }
        }
        let fez2par = this.verificaRepeticoes(lista, 2);
        if (fez1Par && fez2par) {
            return true;
        }

        return false; // não fez 2 pares
    }
};
let cartasJogo = {};
let maiorMao = ""
let fezStraightFlush = false; //verificado;
let fezQuadra = false; //verificado;
let fezFullHouse = false; //verificado;
let fezFlush = false; //verificado;
let fezStraight = false; //verificado;
let fezTrinca = false;
let fezDoisPares = false;
let fezPar = false;

let fizeramStraightFlush = [];
let fizeramQuadra = [];
let fizeramFullHouse = [];
let fizeramFlush = [];
let fizeramStraight = [];
let fizeramTrinca = [];
let fizeramDoisPares = [];
let fizeramPar = [];

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
//let combinations = [];
let count = 0
/*while (count < 1001) {
    table.gerarDeck();
    table.darCartas();
    count = Number(count + 1);
};
combinations.sort((a, b) => a - b);*/

//while (fezStraight == false) {
//    table.gerarDeck();
//    table.darCartas();
//    count = Number(count + 1);
//    console.log(count);
//    console.log(fezStraight);
//};

table.gerarDeck();
table.darCartas();
cartasJogo.MM = maiorMao;

salve(cartasJogo, "Jogo");

//if (fezStraight == true) {
//    salve(fizeramStraight, 'fizeramStraight');
//    console.log('fizeram fizeramStraight: >>>>>>>>>', fizeramStraight);
//    console.log('Rodadas até fazer fizeramStraight: ', count);
//}