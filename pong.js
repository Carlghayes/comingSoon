// You can use a library like Phaser.js to simplify game development

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Pong paddle
const paddleWidth = 10;
const paddleHeight = 60;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;

// Pong ball
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

function drawPaddle() {
    ctx.fillStyle = '#61dafb';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = '#61dafb';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize > canvas.width) {
        // Reset ball position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
