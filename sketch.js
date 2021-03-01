var canvas, backgroundImage;

var gameState = 0;
var runnerCount;
var allPlayers;
var distance = 0;
var database;
var finishedRunners =0;
var form, runner, game;
var passedFinish;
var runners, runner1, runner2, runner3;
var track;
function preload(){

  track = loadImage("images/track.jpg");

  runner1Animation=loadAnimation("images/runner1a.png","images/runner1b.png","images/runner1a.png");
  runner2Animation=loadAnimation("images/runner2a.png","images/runner2b.png","images/runner2a.png");
  runner3Animation=loadAnimation("images/runner3a.png","images/runner3b.png","images/runner3a.png");
  //boyImg = loadAnimation("runner1.png","runner2.png");
  ground = loadImage("images/ground.png");
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();//get gameState 
  game.start();//if gameState is 0, then game starts in function start 
}


function draw(){
  //background(200, 200, 255);
  background("pink");
  if(runnerCount === 3 && finishedRunners === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedRunners === 3){//when all 4 players have finished the game, gameState becomes 2
    game.update(2);
  }
  if(gameState === 2 && finishedRunners ===3){//gameOver and all have finished the game
    game.displayRanks();
  }
 
}


function keyPressed() {
  if (keyCode === 13 && gameState !== 1) {
    form.enter();    
  }
}