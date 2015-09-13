/*
	Author: Yaz Khoury
	Title: Frogger Clone Game
	Date: September 2015
*/

//
// Global Variables
//

var arcadeWidth = 400;
var arcadeHeight = 400;
var liveNumber = 5;
var scoreKeeper = 0;


//
//  Enemy Class
//

var Enemy = function() {

	// The image/sprite for our enemies
	this.sprite = 'images/enemy-bug.png';

	// Function for randomizing enemy initial position
	var yPosition = function() {
		var y = [50, 150, 225];
		return y[Math.floor(Math.random() * y.length)];
	};

	// Enemy initial coordinates
	this.x = -100;
	this.y = yPosition();

	// Enemy height and width
	this.height = 50;
	this.width = 50;

	// Function for random speed generator
	function getRandomSpeed(min, max) {
		return Math.floor(Math.random() * max) + min;
	};

	this.speed = getRandomSpeed(80,200);

};

// Update the enemy's position, detect collision, and resetting
Enemy.prototype.update = function(dt) {

	// Multiply movement by dt parameter, ensuring game runs the same speed on all computers.
	this.x += this.speed * dt;

	// Collision detection
	if (this.x < player.x + player.width &&
		this.x + this.width > player.x &&
		this.y < player.y + player.height &&
		this.height + this.y > player.y) {
		player.reset();
		liveNumber--;
	}

	// Reseting after reaching edge
	if (this.x > arcadeWidth + 100){
		this.reset();
	}

};

// Rendering the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resetting enemy position after reaching the edge
Enemy.prototype.reset = function() {
	this.x = -100;
};


//
//  Player Class
//

var Player = function() {
	// Player initial coordinates
	this.x = 202;
	this.y = 350;
	// Player width and height
	this.height = 50;
	this.width = 50;
	// Player Speed
	this.speed = 25;
	// Player sprite
	this.sprite = 'images/char-boy.png';
};

// Live number and score counting
Player.prototype.update = function(){

	if (this.y <= 3){
		this.reset();
		scoreKeeper++;
	}

	if (liveNumber < 1){
		console.log('Game Over');
		liveNumber = 5;
		scoreKeeper = 0;
	}
};

// Render player image, along with scores and lives
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

	ctx.font = '25px Lato';
	ctx.textAlign = 'right';
	ctx.fillStyle= 'white';

	//Score Counter Text
	ctx.fillText('Score:', 85, 85);
	ctx.fillText(scoreKeeper, 60, 115);

	//Lives Counter Text
	ctx.fillText('Lives:', 485, 85);
	ctx.fillText(liveNumber, 460, 115);
}

// Reset player position
Player.prototype.reset = function(){
	this.x = 200;
	this.y = 400;
}

// Move player according to key input
Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'up':
			this.y = this.y - this.speed;
			break;
		case 'down':
			if (this.y < arcadeHeight) {
				this.y = this.y + this.speed;
			}
			break;
		case 'left':
			if (this.x > 0){
				this.x = this.x - this.speed;
			}
			break;
		case 'right':
			if (this.x < arcadeWidth){
			this.x = this.x + this.speed;
			}
			break;
		default:
			console.log('Play with your arrow keys!')
	}
}


// Instantiate all objects
var allEnemies = [
	enemy = new Enemy(),
	enemy2 = new Enemy(),
	enemy3 = new Enemy()
];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});