const global = {
    CARDS_TYPE_AMOUNT: 6,
    firstCardType: 0,
    secondCardType: 0,
    firstCardId: void 0,
    secondCardId: void 0,
    amountSelectedCards: 0,
    foundPairs: [],
  },
  setup = () => {
    document.getElementById("btnStart").addEventListener("click", startGamePt1);
  },
  getSelectedCardElements = () => [
    document.getElementById(global.firstCardId),
    document.getElementById(global.secondCardId),
  ],
  getRandomZeroInclMaxExcl = (e) => Math.floor(Math.random() * e),
  cardsAreEqual = () => global.secondCardType === global.firstCardType,
  gameIsWon = () => global.foundPairs.length === global.CARDS_TYPE_AMOUNT,
  setSecondCardTypeAndId = (e) => {
    const t = e;
    (global.secondCardType = t.getAttribute("data-imageId")),
      (global.secondCardId = t.getAttribute("id"));
  },
  removeColor = () => {
    const e = getSelectedCardElements();
    for (let t = 0; t < e.length; t++) e[t].style.backgroundColor = "";
  },
  setSuccesColor = () => {
    const e = getSelectedCardElements();
    for (let t = 0; t < e.length; t++)
      e[t].style.backgroundColor = "rgb(3 146 86 / 31%)";
    setTimeout(removeColor, 1e3);
  },
  setFailColor = () => {
    const e = getSelectedCardElements();
    for (let t = 0; t < e.length; t++)
      e[t].style.backgroundColor = "rgb(146 3 63 / 31%)";
    setTimeout(removeColor, 1e3);
  },
  setAllImageIds = () => {
    let e = document.querySelectorAll("img"),
      t = [];
    for (let a = 1; a <= global.CARDS_TYPE_AMOUNT; a++)
      for (let l = 0; l < 2; l++) {
        let l = getRandomZeroInclMaxExcl(e.length);
        for (; t.includes(l); ) l = getRandomZeroInclMaxExcl(e.length);
        (image = e[l]), image.setAttribute("data-imageId", a), t.push(l);
      }
  },
  loadImages = () => {
    (body = document.querySelector("body")), (imgId = 1);
    for (let e = 1; e <= 2 * global.CARDS_TYPE_AMOUNT; e++)
      (image = document.createElement("img")),
        image.setAttribute("src", "images/0.png"),
        image.setAttribute("id", "img" + imgId),
        image.setAttribute("alt", "card"),
        body.appendChild(image),
        imgId++;
  },
  startGamePt1 = (e) => {
    document.querySelector(".menu-container").remove();
    loadImages(), setTimeout(startGamePt2, 100);
  },
  startGamePt2 = () => {
    setAllImageIds(), (images = document.getElementsByTagName("img"));
    for (let e = 0; e < images.length; e++)
      images[e].addEventListener("click", actionsAfterClick);
  },
  actionsAfterClick = (e) => {
    const t = e.target,
      a = t.getAttribute("id"),
      l = t.getAttribute("data-imageId");
    global.foundPairs.includes(l) ||
      (0 === global.amountSelectedCards
        ? (turnAround(t),
          (global.firstCardType = l),
          (global.amountSelectedCards += 1),
          (global.firstCardId = a))
        : a !== global.firstCardId &&
          1 === global.amountSelectedCards &&
          (setSecondCardTypeAndId(t),
          turnAround(t),
          (global.amountSelectedCards += 1),
          setTimeout(actionsAfterCardsSelected, 100)));
  },
  actionsAfterCardsSelected = () => {
    global.secondCardType === global.firstCardType
      ? (global.foundPairs.push(global.firstCardType), setSuccesColor())
      : (setFailColor(), setTimeout(turnAroundSelectedCards, 1e3)),
      setTimeout(setEverythingBackToDefault, 1e3),
      congratulationsIfWon();
  },
  setEverythingBackToDefault = () => {
    (global.firstCardType = 0),
      (global.secondCardType = 0),
      (global.firstCardId = void 0),
      (global.secondCardId = void 0),
      (global.amountSelectedCards = 0);
  },
  turnAround = (e) => {
    e.getAttribute("src").includes("0")
      ? ((id = e.getAttribute("data-imageId")),
        e.setAttribute("src", "images/" + id + ".png"))
      : e.setAttribute("src", "images/0.png");
  },
  turnAroundSelectedCards = () => {
    let e = getSelectedCardElements();
    for (let t = 0; t < e.length; t++) turnAround(e[t]);
  },
  congratulationsIfWon = () => {
    global.foundPairs.length === global.CARDS_TYPE_AMOUNT &&
      (alert("Congratulations, you won the game!"), location.reload());
  };
window.addEventListener("load", setup);
