const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let dealer = [];
let players = [];

/*
    1. User hits deal
        - Create the deck
        - Both sides will be dealt their hands 
        - Calculate total for hands
    2a. Hit
        - Pick another card from the deck
        - Check to see if it's over 21
            a. Show bust screen
            b. 
    2b. Stay

*/


//Create the deck of cards
function createDeck() {
    deck = [];
    for (let i = 0; i < values.length; i++) {
        let value = values[i];

        let weight;
        if(value === "J" || value === "Q" || value === "K")
            weight = 10;
        else if(value === "A")
            weight = 11;
        else
            weight = parseInt(value);

        let spadeCard = {
            value: value,
            suit: 'spade',
            weight: weight
        };
        let heartCard = {
            value: value,
            suit: 'heart',
            weight: weight
        };
        let diamondCard = {
            value: value,
            suit: 'diamond',
            weight: weight
        };
        let clubCard = {
            value: value,
            suit: 'club',
            weight: weight
        };

        deck.push(spadeCard, heartCard, diamondCard, clubCard);
    }
}

function startblackjack() {
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display = "none";
    // deal 2 cards to every player object
    createDeck();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

//Give the cards to each player
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
}

//Randomly pick a card from the deck
function pick() {
    
}

//
function renderCard(card, player) {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

//
function getCardUI(card) {

}

// returns the number of points that a player has in hand
function getPoints(player) {
    let points = 0;
    for (let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function updatePoints() {
    for (let i = 0; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function hitMe() {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
}

function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }

    else {
        end();
    }
}

function end() {
    let winner = -1;
    let score = 0;

    for (let i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }

        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
    document.getElementById("status").style.display = "inline-block";
}

function check() {
    if (players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}

window.addEventListener('load', function () {
    createDeck();
    shuffle();
    createPlayers(1);
});