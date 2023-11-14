const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let cardsName = []
let cardsChosenId = []
let cardsWon = []

//create your board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}
createBoard();


function checkMatch() {

    const cards  = document.querySelectorAll('img');
    const optionOne = cardsChosenId[0];
    const optionTwo = cardsChosenId[1];
    if (optionOne == optionTwo) {
        cards[optionOne].setAttribute('src', 'images/blank.png')
        cards[optionTwo].setAttribute('src', 'images/blank.png')
        alert('You clicked the same image')
    } else if (cardsName[0] == cardsName[1] ) {
        alert('You found a match');
        cards[optionOne].setAttribute('src', 'images/white.png');
        cards[optionTwo].setAttribute('src', 'images/white.png');
        cards[optionOne].removeEventListener('click', flipCard);
        cards[optionTwo].removeEventListener('click', flipCard);
        cardsWon.push(cardsName);
    } else {
        cards[optionOne].setAttribute('src', 'images/blank.png');
        cards[optionTwo].setAttribute('src', 'images/blank.png');
        alert('Try Again !!!');
    }
    resultDisplay.textContent = cardsWon.length;
    cardsName = [];
    cardsChosenId = [];

    if (cardsWon.length == cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all'
    }
}

function flipCard(){
    const cardId = this.getAttribute('data-id');
    cardsName.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)

    if (cardsName.length === 2) {
        setTimeout(checkMatch, 400);
    }


}