const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Pong paddle
const paddleWidth = 10;
const paddleHeight = 75;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5; // Adjust the speed as needed

// Pong ball
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Event listeners for paddle movement
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('wheel', handleMouseScroll);

function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        leftPaddleY -= paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        leftPaddleY += paddleSpeed;
    }

    // Ensure the paddle stays within the canvas boundaries
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
}

function handleKeyUp(event) {
    // Add additional handling if needed
}

function handleMouseScroll(event) {
    // Use the deltaY property to determine the direction of the scroll
    leftPaddleY += Math.sign(event.deltaY) * paddleSpeed;

    // Ensure the paddle stays within the canvas boundaries
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));

    // Prevent the default behavior of the scroll, which would scroll the entire page
    event.preventDefault();
}

function drawPaddle() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = '#e70c3e';
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

    if (ballX - ballSize < 0) {
        // Reset ball position when it goes past the left edge
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    if (ballX + ballSize > canvas.width) {
        // Reverse ball direction when it hits the right edge
        ballSpeedX = -ballSpeedX;
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
