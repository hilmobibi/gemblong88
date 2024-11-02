const cards = {
    heart: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    diamond: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    club: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    spade: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
};

let playerMoney = 1000; // Player's starting money
let currentBet = 0; // Current bet amount
let currentBetType = ""; // Type of bet (Player, Banker, Tie)

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
    const handDisplay = hand.map(card => `${card.rank} of ${card.suit}`).join(", ");
    document.getElementById(elementId).innerText = handDisplay;
}

function updateOngoingScore(playerScore, bankerScore) {
    document.getElementById("ongoing-score").innerText = `Current Score: (Player: ${playerScore}, Banker: ${bankerScore})`;
}

function displayFinalResult(playerScore, bankerScore) {
    let resultText;
    let winnings = 0; // Winnings variable

    if (playerScore > bankerScore) {
        resultText = "Player wins!";
        if (currentBetType === "player") winnings = currentBet; // Player wins
    } else if (bankerScore > playerScore) {
        resultText = "Banker wins!";
        if (currentBetType === "banker") winnings = currentBet; // Banker wins
    } else {
        resultText = "It's a tie!";
        if (currentBetType === "tie") winnings = currentBet * 8; // Tie wins at 8 to 1
    }

    // Update player's money based on winnings
    playerMoney += winnings;
    if (currentBetType !== "tie" && (playerScore !== bankerScore || currentBetType === "tie")) {
        playerMoney -= currentBet; // Subtract the bet if player lost
    }

    document.getElementById("final-result").innerText = `Final Result: ${resultText} (Player: ${playerScore}, Banker: ${bankerScore})`;
    document.getElementById("player-money").innerText = playerMoney; // Update player's money display
}

function playBaccarat() {
    if (currentBet <= 0) {
        alert("Please place a bet before starting the game.");
        return;
    }

    const playerHand = [];
    const bankerHand = [];

    document.getElementById("player-hand").innerText = "";
    document.getElementById("banker-hand").innerText = "";
    document.getElementById("ongoing-score").innerText = "Current Score: (Player: 0, Banker: 0)";
    document.getElementById("final-result").innerText = ""; // Reset final result message

    setTimeout(() => {
        playerHand.push(drawCard());
        displayCard(playerHand, "player-hand");
        updateOngoingScore(calculateScore(playerHand), calculateScore(bankerHand)); // Update ongoing score after first player card
    }, 1000);

    setTimeout(() => {
        bankerHand.push(drawCard());
        displayCard(bankerHand, "banker-hand");
        updateOngoingScore(calculateScore(playerHand), calculateScore(bankerHand)); // Update ongoing score after first banker card
    }, 2000);

    setTimeout(() => {
        playerHand.push(drawCard());
        displayCard(playerHand, "player-hand");
        updateOngoingScore(calculateScore(playerHand), calculateScore(bankerHand)); // Update ongoing score after second player card
    }, 3000);

    setTimeout(() => {
        bankerHand.push(drawCard());
        displayCard(bankerHand, "banker-hand");
        updateOngoingScore(calculateScore(playerHand), calculateScore(bankerHand)); // Update ongoing score after second banker card
    }, 4000);

    setTimeout(() => {
        if (shouldDrawThirdCard(playerHand, true)) {
            playerHand.push(drawCard());
            displayCard(playerHand, "player-hand");
        }
        const playerScore = calculateScore(playerHand);
        const bankerScore = calculateScore(bankerHand);
        updateOngoingScore(playerScore, bankerScore); // Update ongoing score after potential third player card
    }, 5000);

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
function placeBet() {
    const betInput = document.getElementById("bet-amount");
    const betAmount = parseInt(betInput.value);
    const betType = document.querySelector('input[name="bet-type"]:checked').value; // Get the selected bet type

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerMoney) {
        alert("Please enter a valid bet amount.");
        return;
    }

    currentBet = betAmount; // Set the current bet amount
    currentBetType = betType; // Set the current bet type
    betInput.value = ""; // Clear the input field
    alert(`You have placed a bet of $${currentBet} on ${currentBetType}.`);
}

// Define the third card drawing rules (this function should be defined)
function shouldDrawThirdCard(hand, isPlayer) {
    const score = calculateScore(hand);
    return score <= 5; // Player draws a third card if their score is 5 or less
}

// Start the game immediately when the page loads
document.addEventListener('DOMContentLoaded', () => {
    playBaccarat();
});
