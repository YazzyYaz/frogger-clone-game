/*
	Author: Yaz Khoury
	Title: Frogger Clone Game
	Date: September 2015
*/

// NOTE: This file has been modified from the original
// Udacity repository: https://github.com/udacity/frontend-nanodegree-arcade-game

//
// Global Variables
//

var ARCADE_WIDTH = 400;
var ARCADE_HEIGHT = 400;
var LIVE_NUMBER = 5;
var SCORE_KEEPER = 0;


//
//  Enemy Class
//

var Enemy = function() {

	// The image/sprite for our enemies
	this.sprite = 'images/enemy-bug.png';

	// Function for randomizing enemy initial position
	function yPosition() {
		var y = [50, 150, 225];
		return y[Math.floor(Math.random() * y.length)];
	}

	// Enemy initial coordinates
	this.x = -100;
	this.y = yPosition();

	// Function for random speed generator
	function getRandomSpeed(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	this.speed = getRandomSpeed(80,200);

};

// Update the enemy's position, detect collision, and resetting
Enemy.prototype.update = function(dt) {

	// Multiply movement by dt parameter, ensuring game runs the same speed on all computers.
	this.x += this.speed * dt;

	var playerX = player.x;
	var playerY = player.y;
	var enemyX = this.x;
	var enemyY = this.y;

	// Collision detection
	if (Math.abs(enemyX - playerX) < player.width &&
		Math.abs(enemyY - playerY) < player.height) {
		player.reset();
		player.LIVE_NUMBERDown();
	}

	// Reseting after reaching edge
	if (this.x > ARCADE_WIDTH + 100){
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
		SCORE_KEEPER++;
	}

	if (LIVE_NUMBER < 1){
		console.log('Game Over');
		LIVE_NUMBER = 5;
		SCORE_KEEPER = 0;
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
	ctx.fillText(SCORE_KEEPER, 60, 115);

	//Lives Counter Text
	ctx.fillText('Lives:', 485, 85);
	ctx.fillText(LIVE_NUMBER, 460, 115);
};

// Reset player position
Player.prototype.reset = function(){
	this.x = 200;
	this.y = 400;
	tokenCollection = [];
	TokensArray();
};

Player.prototype.LIVE_NUMBERDown = function() {
	LIVE_NUMBER--;
};

// Move player according to key input
Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'up':
			this.y = this.y - this.speed;
			break;
		case 'down':
			if (this.y < ARCADE_HEIGHT) {
				this.y = this.y + this.speed;
			}
			break;
		case 'left':
			if (this.x > 0){
				this.x = this.x - this.speed;
			}
			break;
		case 'right':
			if (this.x < ARCADE_WIDTH){
			this.x = this.x + this.speed;
			}
			break;
		default:
			console.log('Let us cross to the river!');
	}
};


//
//  Token Class
//

var Tokens = function(image, x, y) {

	function getRandomTokenPosition(min, max) {
		return Math.floor(Math.random() * max) + min;
	}
	var randomVal = getRandomTokenPosition(30, 250);

	this.x = x + randomVal;
	this.y = y + randomVal;
	this.sprite = image;
};

Tokens.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Tokens.prototype.getTokens = function() {
	// Collision Detection
	var playerX = player.x;
	var playerY = player.y;
	var itemX = this.x;
	var itemY = this.y;
	if (Math.abs(itemX - playerX) < player.width &&
		Math.abs(itemY - playerY) < player.height) {
		tokenCollection.splice(tokenCollection.indexOf(this), 1);
		// 20 Points for each token collected
		SCORE_KEEPER = SCORE_KEEPER + 20;
		if (tokenCollection.length === 0) {
			console.log('Good job collecting all the tokens!');
		}
	}
};


// Instantiate all objects
var allEnemies = [];

setInterval(function() {
	allEnemies.push(new Enemy());
}, 5000);

var player = new Player();

var tokenCollection = [];


var TokensArray = function () {
	tokenCollection.push(new Tokens('images/Gem Orange.png', 10, 10));
	tokenCollection.push(new Tokens('images/Gem Green.png', 10, 10));
	tokenCollection.push(new Tokens('images/Gem Blue.png', 10, 10));
	tokenCollection.push(new Tokens('images/Key.png', 20, 20));
};
TokensArray();


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