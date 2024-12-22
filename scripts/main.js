let deck = [];
let playerHand = [];
let bankerHand = [];
let playerBet = '';
let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 10000; // Retrieve saved balance or set default
let betAmount = 0; // selected bet amount

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format with thousands separator
}

function initializeDeck() {
    deck = [];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = [
        { name: 'ace', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 },
        { name: '4', value: 4 }, { name: '5', value: 5 }, { name: '6', value: 6 },
        { name: '7', value: 7 }, { name: '8', value: 8 }, { name: '9', value: 9 },
        { name: '10', value: 10 }, { name: 'jack', value: 10 },
        { name: 'queen', value: 10 }, { name: 'king', value: 10 }
    ];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({
                value: value.value,
                suit: suit,
                image: `assets/images/cards/${value.name}_of_${suit}.png`
            });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function selectBetAmount(amount) {
    betAmount = amount;
    document.getElementById("bet-amount").innerHTML = `Taruhan: Rp ${formatCurrency(amount)}`;
    document.getElementById("result").innerHTML = ''; // Clear result when selecting a new bet
}

function placeBet(bet) {
    if (betAmount > balance) {
        alert("Sadar diri tolol, liat saldo lu berapa...");
        return;
    }
    playerBet = bet;
    balance -= betAmount;
    updateBalanceDisplay();
    localStorage.setItem("balance", balance); // Save updated balance to localStorage
    startGame(betAmount);
}

function updateBalanceDisplay() {
    document.getElementById("balance").innerHTML = `Saldo: Rp ${formatCurrency(balance)}`;
}

function startGame(betAmount) {
    initializeDeck();
    playerHand = [];
    bankerHand = [];

    document.getElementById("player-cards").innerHTML = '';
    document.getElementById("banker-cards").innerHTML = '';
    document.getElementById("result").innerHTML = '';
    document.getElementById("player-cumulative-score").innerHTML = 'Skor: 0';
    document.getElementById("banker-cumulative-score").innerHTML = 'Skor: 0';

    drawAndRevealCard(playerHand, "player-cards", "player-cumulative-score");
    setTimeout(() => drawAndRevealCard(bankerHand, "banker-cards", "banker-cumulative-score"), 1000);
    setTimeout(() => drawAndRevealCard(playerHand, "player-cards", "player-cumulative-score"), 2000);
    setTimeout(() => drawAndRevealCard(bankerHand, "banker-cards", "banker-cumulative-score"), 3000);
    setTimeout(() => {
        const playerScore = calculateScore(playerHand);
        const bankerScore = calculateScore(bankerHand);

        let result = determineWinner(playerScore, bankerScore);
        let winAmount = 0;

        document.getElementById("result").innerHTML = result;

        if (result === 'Pemain menang' && playerBet === 'Player') {
            winAmount = betAmount * 2;
            balance += winAmount;
        } else if (result === 'Banker menang' && playerBet === 'Banker') {
            winAmount = betAmount * 1.95;
            balance += winAmount;
        } else if (result === 'Seri' && playerBet === 'Tie') {
            winAmount = betAmount * 8;
            balance += winAmount;
        } else if (result === 'Seri' && (playerBet === 'Player' || playerBet === 'Banker')) {
            balance += betAmount;
            winAmount = betAmount;
        }

        // Top-up balance if below 2000 after the game ends
        if (balance < 2000) {
            balance = 2000;
            alert("wkwk bais");
        }

        updateBalanceDisplay();
        localStorage.setItem("balance", balance); // Save updated balance to localStorage

        if (winAmount > 0) {
            const winAmountDisplay = document.createElement("div");
            winAmountDisplay.className = "win-amount";
            winAmountDisplay.innerHTML = `Uang yang didapat: Rp ${formatCurrency(winAmount)}`;
            document.getElementById("result").appendChild(winAmountDisplay);
        }

        setTimeout(() => {
            document.getElementById("result").innerHTML = '';
        }, 2000);
    }, 4000);
}

function drawAndRevealCard(hand, elementId, scoreId) {
    const card = drawCard();
    hand.push(card);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-image-container";

    const cardImage = document.createElement("img");
    cardImage.src = card.image;
    cardImage.className = "card-image";
    cardContainer.appendChild(cardImage);
    document.getElementById(elementId).appendChild(cardContainer);

    const score = calculateScore(hand);
    document.getElementById(scoreId).innerHTML = `Skor: ${score}`;
}

function drawCard() {
    return deck.pop();
}

function calculateScore(hand) {
    let total = 0;
    for (let card of hand) {
        total += card.value;
    }
    return total % 10;
}

function determineWinner(playerScore, bankerScore) {
    if (playerScore > bankerScore) return 'Pemain menang';
    if (bankerScore > playerScore) return 'Banker menang';
    return 'Seri';
}

updateBalanceDisplay();