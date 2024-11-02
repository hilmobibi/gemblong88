const cards = {
    heart: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    diamond: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    club: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    spade: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
};

let playerMoney = 1000; // Player's starting money in rupiah
let currentBet = 100; // Default bet amount in rupiah
let currentBetType = ""; // Type of bet (Player, Banker, Tie)
let gameHistory = []; // Array to hold the history of wins

function drawCard() {
    const suits = Object.keys(cards);
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = cards[suit][Math.floor(Math.random() * cards[suit].length)];
    return { suit, rank };
}

function calculateScore(hand) {
    let total = 0;
    for (let card of hand) {
        if (card.rank === "A") {
            total += 1;
        } else if (["J", "Q", "K", "10"].includes(card.rank)) {
            total += 0;
        } else {
            total += parseInt(card.rank);
        }
    }
    return total % 10;
}

function displayCard(hand, elementId) {
    // Display cards as list items
    const handDisplay = hand.map(card => `${card.rank} of ${card.suit}`).map(item => `<li>${item}</li>`).join("");
    document.getElementById(elementId).innerHTML = handDisplay; // Use innerHTML for rendering list
}

function displayFinalResult(playerScore, bankerScore) {
    let resultText;
    let winnings = 0; // Winnings variable

    if (playerScore > bankerScore) {
        resultText = "Player wins!";
        if (currentBetType === "player") winnings = currentBet * 2; // Player wins double
    } else if (bankerScore > playerScore) {
        resultText = "Banker wins!";
        if (currentBetType === "banker") winnings = currentBet * 1.95; // Banker wins at 1.95x
    } else {
        resultText = "It's a tie!";
        if (currentBetType === "tie") winnings = currentBet * 8; // Tie wins at 8 to 1
    }

    // Update player's money based on winnings
    playerMoney += winnings;

    // Subtract the bet if player lost
    if (currentBetType !== "tie" && (playerScore !== bankerScore || currentBetType === "tie")) {
        playerMoney -= currentBet; 
    }

    // Show final result and update player's money
    document.getElementById("final-result").innerText = `Final Result: ${resultText} (Player: ${playerScore}, Banker: ${bankerScore})`;
    document.getElementById("player-money").innerText = `Rp ${playerMoney.toFixed(2)}`; // Update player's money display with rupiah
    
    // Update game history
    updateGameHistory(resultText);
}

function updateGameHistory(resultText) {
    const historyList = document.getElementById("history-list");
    const listItem = document.createElement("li");
    listItem.innerText = resultText;
    historyList.appendChild(listItem);
    gameHistory.push(resultText); // Store in history array
}

function playBaccarat() {
    if (currentBet <= 0) {
        document.getElementById("final-result").innerText = "Please place a bet before starting the game.";
        return;
    }

    const playerHand = [];
    const bankerHand = [];

    document.getElementById("player-hand").innerHTML = ""; // Clear previous hands
    document.getElementById("banker-hand").innerHTML = "";
    document.getElementById("final-result").innerText = ""; // Reset final result message

    // Deal first player card with delay
    setTimeout(() => {
        playerHand.push(drawCard());
        displayCard(playerHand, "player-hand");
    }, 1000);

    // Deal first banker card with delay
    setTimeout(() => {
        bankerHand.push(drawCard());
        displayCard(bankerHand, "banker-hand");
    }, 2000);

    // Deal second player card with delay
    setTimeout(() => {
        playerHand.push(drawCard());
        displayCard(playerHand, "player-hand");
    }, 3000);

    // Deal second banker card with delay
    setTimeout(() => {
        bankerHand.push(drawCard());
        displayCard(bankerHand, "banker-hand");
    }, 4000);

    // Check for third card for player with delay
    setTimeout(() => {
        if (shouldDrawThirdCard(playerHand, true)) {
            playerHand.push(drawCard());
            displayCard(playerHand, "player-hand");
        }
        const playerScore = calculateScore(playerHand);
        const bankerScore = calculateScore(bankerHand);
    }, 5000);

    // Check for third card for banker with delay
    setTimeout(() => {
        if (shouldDrawThirdCard(bankerHand, false)) {
            bankerHand.push(drawCard());
            displayCard(bankerHand, "banker-hand");
        }
        const playerScore = calculateScore(playerHand);
        const bankerScore = calculateScore(bankerHand);

        // Delay for showing the final result
        setTimeout(() => {
            displayFinalResult(playerScore, bankerScore); // Final result update
        }, 2000); // Delay of 2 seconds for the final result message
    }, 6000);
}

// Function to place the bet
function placeBet(betType) {
    if (playerMoney <= 0) {
        document.getElementById("final-result").innerText = "You don't have enough money to place a bet.";
        return;
    }

    currentBetType = betType; // Set the current bet type
    document.getElementById("final-result").innerText = `You have placed a bet of Rp ${currentBet} on ${currentBetType}.`;
}

// Define the third card drawing rules
function shouldDrawThirdCard(hand, isPlayer) {
    const score = calculateScore(hand);
    return score <= 5; // Player draws a third card if their score is 5 or less
}

// Start the game immediately when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("final-result").innerText = ""; // Ensure final result is empty on load
});
