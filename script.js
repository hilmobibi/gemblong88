
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

      