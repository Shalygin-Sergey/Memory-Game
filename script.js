const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = (e) => {
    // card block check
    
    if (boardLocked) return;

    // find out which card is selected
    
    const target = e.target.parentElement;

    if(target === firstCard) return;

    target.classList.add('flip');

    if(!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = target;
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = target;

        // check for match
        checkForMatch();
    }
}
// check cards for identity
const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
    isEqual ? disableCards() : unflipCards();
}

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

const unflipCards = () => {
    boardLocked = true;
    // remove the class if the cards do not match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 900)
}

const resetBoard = () => {
    // Spread
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];

    // Double insertation
    // hasFlippedCard = boardLocked = false;
    // firstCard = secondCard = null;
}


cards.forEach((card) => {
    // add event listener to every card
    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
})

