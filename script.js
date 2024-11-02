
const cards = {
    heart: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    diamond: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    club: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    spade: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
};

// Helper function to get a random card from the deck
function drawCard() {
    const suits = Object.keys(cards);
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = cards[suit][Math.floor(Math.random() * cards[suit].length)];
    return { suit, rank };
}

// Helper function to calculate Baccarat score for a hand
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
    // Baccarat only uses the last digit of the total score
    return total % 10;
}

// Draw two cards for a hand
function initialDraw() {
    return [drawCard(), drawCard()];
}

// Determine if a third card should be drawn for player/banker
function shouldDrawThirdCard(hand, isPlayer) {
    const score = calculateScore(hand);
    if (isPlayer) {
        // Player draws a third card if their score is 5 or less
        return score <= 5;
    } else {
        // Banker draws based on the player's third card or their own score
        return score <= 5; // Simplified rule, real Baccarat has more detailed conditions
    }
}

// Play a round of Baccarat
function playBaccarat() {
    const playerHand = initialDraw();
    const bankerHand = initialDraw();

    console.log("Player's initial hand:", playerHand);
    console.log("Banker's initial hand:", bankerHand);

    let playerScore = calculateScore(playerHand);
    let bankerScore = calculateScore(bankerHand);

    // Draw third card if conditions are met
    if (shouldDrawThirdCard(playerHand, true)) {
        playerHand.push(drawCard());
        playerScore = calculateScore(playerHand);
        console.log("Player draws a third card:", playerHand[2]);
    }
    if (shouldDrawThirdCard(bankerHand, false)) {
        bankerHand.push(drawCard());
        bankerScore = calculateScore(bankerHand);
        console.log("Banker draws a third card:", bankerHand[2]);
    }

    console.log("Player's final hand:", playerHand, "Score:", playerScore);
    console.log("Banker's final hand:", bankerHand, "Score:", bankerScore);

    // Determine the winner
    if (playerScore > bankerScore) {
        console.log("Player wins!");
    } else if (bankerScore > playerScore) {
        console.log("Banker wins!");
    } else {
        console.log("It's a tie!");
    }
}

// Run the game
playBaccarat();

//bacarrat game
/*
const playerButton = document.getElementById("playerButton");
const tieButton = document.getElementById("tieButton");
const bankerButton = document.getElementById("bankerButton");

playerButton.onclick = function() {
    let result = calculateResult();
    console.log(result);
    if (result === "player") {
        console.log("x2");
    } else if (result === "tie") {
        console.log("balik modal");
    } else {
        console.log("kalah jingg");
    }
};

tieButton.onclick = function() {
    let result = calculateResult();
    console.log(result);
    if (result === "tie") {
        console.log("x8");
    } else {
        console.log("kalah jingg");
    }
};

bankerButton.onclick = function() {
    let result = calculateResult();
    console.log(result);
    if (result === "banker") {
        console.log("x1.95");
    } else if ( result === "tie") {
        console.log("balik modal");
    } else {console.log ()}
};

function calculateResult() {
    let randomnumb = Math.random();
    let result = "";  
    if (randomnumb <= 0.4462) {
        result = "player";
    } else if (randomnumb <= 0.9048) {
        result = "banker";
    } else {
        result = "tie";
    }
    return result;

}
*/
      