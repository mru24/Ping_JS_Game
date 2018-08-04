var container = document.querySelector('#container');
var board = document.querySelector('#gameBoard');
var slider = document.querySelector('#slider');
var cc = document.querySelector('#canvas');
var ccx = cc.getContext("2d");

// canvas size
cc.setAttribute('width', board.offsetWidth);
cc.setAttribute('height', board.offsetHeight);

// playground
var pgWidth = cc.width;
var pgHeight = cc.height;

// paddles
var pWidth = cc.width/50;
var pHeight = cc.height/5;
var pxPos = 20;
var pyPos = cc.height/2 - pHeight/2;

// ball
var ballX = cc.width/2;
var ballY = cc.height/2;
var ballSize = 15;


window.onload = function() {
  // create game board
  createRect(0, 0, pgWidth, pgHeight, "green");
  // create paddle
  createRect(pxPos, pyPos, pWidth, pHeight, "white");
  // create ball
  createCircle(ballX, ballY, ballSize, "white");
}


// functions

function createRect(posX, posY, width, height, color) {
  ccx.fillStyle = color;
  ccx.fillRect(posX, posY, width, height);
}

function createCircle(posX, posY, size, color) {
  ccx.beginPath();
  ccx.fillStyle = color;
  ccx.arc(posX, posY, size, 0, 2*Math.PI);
  ccx.fill();
}
