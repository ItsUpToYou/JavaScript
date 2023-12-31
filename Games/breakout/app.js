const grid = document.querySelector('.grid')
const scoreDislay = document.querySelector('#score')
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStartPosition = [270, 40];
let currentBallPosition = ballStartPosition;

let score = 0;
let timerId;
let xDirection = -2;
let yDirection = 2;
//create block
class Block{
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

//all myblocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),


]

//draw all my blocks
function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlocks()


//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

//draw the ball
function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}

// move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div');
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//moving the ball
function movieBall() {
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall()
    checkForCollisions()
}

timerId = setInterval(movieBall, 14);

//check for collisions
function checkForCollisions() {
    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if ((currentBallPosition[0] > blocks[i].bottomLeft[0] &&
            currentBallPosition[0] < blocks[i].bottomRight[0] &&
            ((currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1])
            && currentBallPosition[1] < blocks[i].topLeft[1]
        )) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1)
            changeDirection()
            score++;
            scoreDislay.innerHTML = score;

            //check for win

            if (blocks.length === 0) {
                scoreDislay.innerHTML = "YOU WIN";
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser)
            }
        }
    }




    //check for wall collisions
    if (currentBallPosition[0] >= (boardWidth - ballDiameter) ||
        currentBallPosition[1] >= (boardHeight - ballDiameter) ||
        currentBallPosition[0] <= 0) {
        changeDirection();
    }
    //check for user collisions
    if (currentBallPosition[0] > currentPosition[0] &&
        currentBallPosition[0] < currentPosition[0] + blockWidth &&
        (currentBallPosition[1] > currentPosition[1] && currentBallPosition[1] < currentPosition[1] + blockHeight)) {
        changeDirection()
    }


    //check for game over
    if (currentBallPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDislay.innerHTML = 'You lose';
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2  ) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return;
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return;
    }

    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return;
    }
}