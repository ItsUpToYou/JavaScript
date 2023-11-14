const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let timerId = null;
let currentTime = 60

function randomSquare() {
    squares.forEach(square=> {
        square.classList.remove('mole');

    } )

    let randomPosition = squares[Math.floor(Math.random() * squares.length)]
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown',  () => {

        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
})

function moveMole() {
     timerId = setInterval(randomSquare,500)
}


moveMole();


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
    }

}

let countDownTimerId = setInterval(countDown, 1000)
