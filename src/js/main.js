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
var pxPos = cc.width - 20 - pWidth;
var pyPos = cc.height/2 - pHeight/2;

// ball
var ballX = cc.width/2;
var ballY = cc.height/2;
var size = 15;
// ball speed
var xv = 5;
var yv = 2;

// game speed
var gameSpeed = 50;

window.onload = function() {

  setInterval(function() {

    MoveElements();
    DrawElements();
    PaddleMove();

  }, 1000/(gameSpeed));
}


// functions

function DrawElements() {
  // create game board
  createRect(0, 0, pgWidth, pgHeight, "green");
  // create paddle
  createRect(pxPos, pyPos, pWidth, pHeight, "white");
  // create ball
  createCircle(ballX, ballY, size, "white");
}

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

function PaddleMove() {
  slider.addEventListener("mousemove", function(e) {
    pyPos = e.clientY - pHeight/2;
    if(pyPos < 0) {
      pyPos = 0;
    }
    if(pyPos > cc.height - pHeight) {
      pyPos = cc.height - pHeight;
    }
  })
}

function MoveElements() {
  ballX += xv;
  ballY += yv;

  if((ballY - size < 0) || (ballY + size > cc.height)) {
    yv = -yv;
  }

  if((ballX + size > pxPos) && ((ballY > pyPos) && (ballY < pyPos + pHeight))) {
    xv = -xv;
  }

  if(ballX - size < 0) {
    xv = -xv;
  }
}
