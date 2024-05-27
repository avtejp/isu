// Variables for ball properties
var balls = []; // Array to store multiple balls
var paddleColor; // Color for the paddle
var ballColor; // Color for the ball
var backgroundColor; // Color for the background
var xSpeed, ySpeed; // Speed of the balls

// Game variables
var score = 0; // Player's score
var level = 1; // Current level
var lives = 3; // Player's lives
var gameOver = false; // Flag to indicate if the game is over
var gameStarted = false; // Flag to indicate if the game has started

// Canvas setup
function setup() {
  createCanvas(500, 500); // Create a canvas with width 500 and height 500
  paddleColor = color('#ffffff'); // Set paddle color to white
  ballColor = color('#050000'); // Set ball color to Black
  backgroundColor = color('#03eaff'); // Set background color to Torquiose
}

// Starting screen
function drawStartScreen() {
  background(backgroundColor); // Set the background color

  fill('#fff'); // Set text color to white
  textSize(36); // Set text size
  textAlign(CENTER, CENTER); // Set text alignment
  text("Press Enter to Start", width / 2, height / 2); // Display start message
}

// Background and main game loop
function draw() {
  if (!gameStarted) { // If the game hasn't started yet
    drawStartScreen(); // Draw the start screen
  } else if (!gameOver) { // If the game is not over
    background(backgroundColor); // Set the background color

    // Paddle
    fill(paddleColor); // Set the fill color for the paddle
    rect(mouseX, 375, 90, 15); // Draw the paddle at the mouse position

    // Functions
    move(); // Move the balls
    bounce(); // Make the balls bounce off walls
    paddle(); // Handle paddle-ball interaction
    display(); // Display the balls

    // Score
    fill('#d9c3f7'); // Set the fill color for the score
    textSize(24); // Set the text size for the score
    text("Score: " + score, 10, 25); // Display the player's score

    // Lives
    text("Lives: " + lives, width - 100, 25); // Display the player's lives
  } else {
    // Game over screen
    fill('#fff'); // Set text color to white
    textSize(36); // Set text size
    textAlign(CENTER, CENTER); // Set text alignment
    text("Game Over. Press Enter to Restart", width / 2, height / 2); // Display game over message
  }
}

// Ball Functions
function move() {
  for (var i = 0; i < balls.length; i++) { // Loop through each ball
    balls[i].x += balls[i].xSpeed; // Update the x position of the ball
    balls[i].y += balls[i].ySpeed; // Update the y position of the ball
  }
}

function bounce() {
  for (var i = 0; i < balls.length; i++) { // Loop through each ball
    if (balls[i].x < 10 || balls[i].x > width - 10) { // If the ball hits the left or right wall
      balls[i].xSpeed *= -1; // Reverse the x direction of the ball
    }
    if (balls[i].y < 10 || balls[i].y > height - 10) { // If the ball hits the top or bottom wall
      balls[i].ySpeed *= -1; // Reverse the y direction of the ball
    }
  }
}

// Reset Ball
function reset() {
  balls = []; // Clear the array of balls
  for (var i = 0; i < level; i++) { // Add balls based on the current level
    balls.push({ // Add a new ball to the array
      x: Math.floor(Math.random() * 300) + 50, // Randomize x position of the ball
      y: 50, // Set y position of the ball
      xSpeed: random(2 + level, 7 + level), // Randomize x speed of the ball (increases with level)
      ySpeed: random(-7 - level, -2 - level) // Randomize y speed of the ball (increases with level)
    });
  }
}

function display() {
  for (var i = 0; i < balls.length; i++) { // Loop through each ball
    fill(ballColor); // Set the fill color for the ball
    ellipse(balls[i].x, balls[i].y, 20, 20); // Draw the ball
  }
}

// Bounce off Paddle
function paddle() {
  for (var i = 0; i < balls.length; i++) { // Loop through each ball
    if ((balls[i].x > mouseX && balls[i].x < mouseX + 90) && (balls[i].y + 10 >= 375)) { // If the ball hits the paddle
      balls[i].xSpeed *= -1; // Reverse the x direction of the ball
      balls[i].ySpeed *= -1; // Reverse the y direction of the ball
      score++; // Increment the player's score
      if (score % 15 === 0) { // If score is a multiple of 15
        level++; // Increase the level
        reset(); // Reset the balls for the new level
      }
    }
  }
  if (balls[0].y > height - 10) { // If the first ball goes below the paddle
    lives--; // Decrement lives
    if (lives <= 0) { // If no lives left
      gameOver = true; // Set game over to true
    } else { // If lives remaining
      reset(); // Reset ball position and speed
    }
  }
}

function keyPressed() {
  if (!gameStarted) { // If the game hasn't started yet
    if (keyCode === ENTER) { // If Enter key is pressed
      gameStarted = true; // Start the game
      reset(); // Reset the game
    }
  } else if (gameOver) { // If the game is over
    if (keyCode === ENTER) { // If Enter key is pressed
      gameOver = false; // Reset game over state
      lives = 3; // Reset lives
      level = 1; // Reset level
      score = 0; // Reset score
      reset(); // Reset ball position and speed
    }
  }
}