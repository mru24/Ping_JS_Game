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
var pxPos = cc.width - 80 - pWidth;
var pyPos = cc.height/2 - pHeight/2;

// ball
var ballX = cc.width/2;
var ballY = cc.height/2;
var size = 15;
// ball speed
var xv = 8;
var yv = 2;

// game speed
var gameSpeed = 40;

// score board
var round = 1;
var point = 0;
var record = 0;

window.onload = function() {

  setInterval(function() {

    MoveElements();
    PaddleMove();
    DrawElements();

  }, 1000/(gameSpeed));
}


// functions

function DrawElements() {
  // create game board
  createRect(0, 0, pgWidth, pgHeight, "green");
  // create paddle
  createRect(pxPos, pyPos, pWidth, pHeight, "white");
  // score
  document.querySelector('#box1').innerHTML = round;
  // points
  document.querySelector('#box2').innerHTML = point;
  // high score
  document.querySelector('#box3').innerHTML = record;

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

function createText(txt, posX, posY, font, color) {
  ccx.font = font;
  ccx.fillStyle = color;
  ccx.textAlign = "center";
  ccx.fillText(txt, posX, posY);
}

function reset() {
  point = 0;
  ballX = cc.width/2;
  ballY = cc.height/2;
  xv = 10;
  yv = 3;
  xv = -xv;
}

function addSpeed() {
  console.log("speedUp", xv, yv);
  // ball x speed
  if(xv > 0) {
    xv += 1;
  }
  if(xv < 0) {
    xv -= 1;
  }
  // ball y speed
  if(yv > 0) {
    yv += 0.4;
  }
  if(yv < 0) {
    yv -= 0.4;
  }
}

function addPoint() {
  point += 1;
}

function highScore() {
  if(point <= record) {
    record = record
  } else {
    record += 1;
  }
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

  // ball top and bottom collision
  if((ballY - size < 0) || (ballY + size > cc.height)) {
    yv = -yv;
  }

  if(ballX+size > pxPos && ballX+size < pxPos+5) {
    if(ballY > pyPos && ballY < pyPos + pHeight){
      xv = -xv;
    }
  }
  if(ballX > cc.width) {
    reset();
    round += 1;
  }
  // ball missed paddle
  // if(ballX > cc.width) {
  //   reset();
  //   round += 1;
  // }
  // // ball and paddle collision
  // if(ballX + size > pxPos && (ballY > pyPos && ballY < pyPos + pHeight) && xv > 0) {
  //   xv = -xv;
  //   addSpeed();
  //   addPoint();
  //   highScore();
  // }

  // ball left wall collision
  if(ballX - size < 0) {
    xv = -xv;
  }
}
