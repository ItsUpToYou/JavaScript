const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseBtn = document.querySelector('#start-pause-button')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const squares = document.querySelectorAll('.grid div')
console.log(squares)

let currentIndex = 76;
const width = 9;
let timerId
let currentTime = 60
let outcomeTimerId

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex--;
            break
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex++;
            break
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add('frog')
}


function autoMoveLogs() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(lleft => moveLogLeft(lleft))
    logsRight.forEach(lright => moveLogRight(lright))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function checkOutComes() {
    lose()
    win()
}


function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}


function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break

    }
}

function moveCarRight(carsRight) {
    switch (true) {
        case carsRight.classList.contains('c1'):
            carsRight.classList.remove('c1')
            carsRight.classList.add('c3')
            break
        case carsRight.classList.contains('c2'):
            carsRight.classList.remove('c2')
            carsRight.classList.add('c1')
            break
        case carsRight.classList.contains('c3'):
            carsRight.classList.remove('c3')
            carsRight.classList.add('c2')
            break

    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0) {
        resultDisplay.textContent = 'You lose!';
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You win!';
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId)
        outcomeTimerId = null;
        timerId = null;
        document.removeEventListener('keyup', moveFrog)

    } else {

        timerId = setInterval(autoMoveLogs, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})





