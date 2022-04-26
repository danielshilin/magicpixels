const global = {
    CARDS_TYPE_AMOUNT: 6,
    firstCardType: 0,
    secondCardType: 0,
    firstCardId: undefined,
    secondCardId: undefined,
    amountSelectedCards: 0,
    foundPairs: []
}

const setup = () => {
    document.getElementById("btnStart").addEventListener("click", startGame);
}

// Getters
const getSelectedCardElements = () => {
    return [document.getElementById(global.firstCardId), document.getElementById(global.secondCardId)];
}
const getRandomZeroInclMaxExcl = (max) => {
    return (Math.floor(Math.random() * max));
}
const cardsAreEqual = () => {
    return global.secondCardType === global.firstCardType;
}
const gameIsWon = () => {
    return global.foundPairs.length === global.CARDS_TYPE_AMOUNT;
}

// Setters
const setSecondCardTypeAndId = (eventTarget) => {
    const secondCard = eventTarget;
    global.secondCardType = secondCard.getAttribute("data-imageId");
    global.secondCardId = secondCard.getAttribute("id");
}
const removeColor = () => {
    const elements = getSelectedCardElements();
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "";
    }
}
const setSuccesColor = () => {
    const elements = getSelectedCardElements();
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "rgb(3 146 86 / 31%)";
    }
    setTimeout(removeColor, 1000);
}
const setFailColor = () => {
    const elements = getSelectedCardElements();
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "rgb(146 3 63 / 31%)";
    }
    setTimeout(removeColor, 1000);
}
// set img attributes data-imageId to numbers corresponding to image names
const setAllImageIds = () => {
    let images = document.querySelectorAll("img");

    let usedIndexes = [];
    // for each card type (which is a number) give it to a random unused img element twice
    for (let i = 1; i <= global.CARDS_TYPE_AMOUNT; i++) {
        for (let j = 0; j < 2; j++) {
            let randomInd = getRandomZeroInclMaxExcl(images.length);
            while (usedIndexes.includes(randomInd)) {
                randomInd = getRandomZeroInclMaxExcl(images.length);
            }
            image = images[randomInd];
            image.setAttribute("data-imageId", i);
            usedIndexes.push(randomInd);
        }
    }
}

// functions
const startGame = (event) => {
    event.target.style.display = "none";
    setAllImageIds();
    displayAllImages();
    images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", actionsAfterClick);
    }
}
const actionsAfterClick = (event) => {
    const card = event.target;
    const cardId = card.getAttribute("id");
    const cardType = card.getAttribute("data-imageId");
    // if card is not in foundPairs
    if (!global.foundPairs.includes(cardType)) {
        // if no card is turned around
        if (global.amountSelectedCards === 0) {
            turnAround(card);
            global.firstCardType = cardType;
            global.amountSelectedCards += 1;
            global.firstCardId = cardId;

            // if card is not first selected card and only one selected card
        } else if (cardId !== global.firstCardId
            && global.amountSelectedCards === 1) {
            setSecondCardTypeAndId(card);

            turnAround(card);
            global.amountSelectedCards += 1;
            setTimeout(actionsAfterCardsSelected, 100)
        }
    }

}
const displayAllImages = () => {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "unset"
    }
}
const actionsAfterCardsSelected = () => {
    if (cardsAreEqual()) {
        console.log("equal");
        global.foundPairs.push(global.firstCardType);
        setSuccesColor();
    } else {
        console.log("not equal");
        setFailColor();
        setTimeout(turnAroundSelectedCards, 1000);
    }
    setTimeout(setEverythingBackToDefault, 1000);
    congratulationsIfWon();
}
const setEverythingBackToDefault = () => {
    global.firstCardType = 0;
    global.secondCardType = 0;
    global.firstCardId = undefined;
    global.secondCardId = undefined;
    global.amountSelectedCards = 0;
}
const turnAround = (card) => {
    if (card.getAttribute("src").includes("0")) {
        id = card.getAttribute("data-imageId");
        card.setAttribute("src", "images/" + id + ".png");
    } else {
        card.setAttribute("src", "images/" + 0 + ".png");
    }
}
const turnAroundSelectedCards = () => {
    let cards = getSelectedCardElements();
    for (let i = 0; i < cards.length; i++) {
        turnAround(cards[i])
    }
}
const congratulationsIfWon = () => {
    if (gameIsWon()) {
        alert("Congratulations, you won the game!");
        location.reload();
    }

}

window.addEventListener("load", setup);