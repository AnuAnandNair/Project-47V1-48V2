class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      runner = new Runner();
      var runnerCountRef = await database.ref('runnerCount').once("value");
      if(runnerCountRef.exists()){
        runnerCount = runnerCountRef.val();
        runner.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,200);
    runner1.addAnimation("run1",runner1Animation);
    runner1Animation.frameDelay = 200;
    runner1.scale=0.5;
    //runner1.scale=0.5;
    runner1.setCollider("circle", 0,0,60);
    //runner1.addImage("car1",car1_img);

    runner2 = createSprite(300,200);
    runner2.addAnimation("run2",runner2Animation);
    runner2Animation.frameDelay = 200;
    runner2.scale=0.5;
    //runner2.scale=-0.5;
    runner2.setCollider("circle", 0,0,60);
    //runner2.addImage("car2",car2_img);

    runner3 = createSprite(500,200);
    runner3.addAnimation("run3",runner3Animation);
    runner3Animation.frameDelay = 200;
    runner3.scale=0.1;
    //runner3.scale=-0.5;
    runner3.setCollider("circle", 0,0,60);   
    //runner3.addImage("car3",car3_img);

    /*runner4 = createSprite(700,200);    
    runner4.addAnimation("run4",runner4Animation);
    runner4Animation.frameDelay = 200;
    runner4.scale=-0.5;
    runner4.setCollider("circle", 0,0,60);*/
    //runner4.addImage("car4",car4_img);

    runners = [runner1, runner2, runner3 /*,runner4*/];
    passedFinish= false;//false in the start and then when a player raeches the end point, passsedFinish becomes false
  }

  play(){
    form.hide();
    
    Runner.getRunnerInfo();
    runner.getFinishedRunners();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));//for ground
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 230;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;
       // console.log(index, runner.index)

       
        if (index === runner.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = runners[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        textAlign(CENTER);//to display the name of players along with their cars, y should be down so y+75
        textSize(20);
        fill("red")
        text(allPlayers[plr].name, runners[index - 1].x, runners[index - 1].y + 75);
      }

    }

    if(keyIsDown(UP_ARROW) && runner.index !== null && passedFinish!==true){//passedFinish===false if the user didnt finished playing
      //then only up arrow key should work and the player can move forward.
      //passedFinish!==true is added so that up arrow key doesnt work and move car forward once the player reaches the\
      //end point. In the next block, if distance> limit, passedFinish becomes true and once player reaches end point
      //passedFinish is true and passedFinish!==true becomes false and up arrowkey will not work
      runner.distance +=10;//adjust speed of car 
      runner.update();
    }    
    
    if(runner.distance >  4200 && passedFinish===false){  //player has reached destination
      Runner.updateFinishedRunners();///update the finished player number as one more player has finished playing
      runner.rank= finishedRunners;//current players rank is the number of finished players which is given by updateFinishedPlayers()
      runner.update();//updates player.rank in database //player.rank in program is already updated in the previous line
      passedFinish= true;//for a particular player
      alert("You reached destination!!!!! Congratulations. Rank is "+runner.rank);//window.alert("player Wins");
     
    }
   
    drawSprites();
  }

  displayRanks(){//called from function draw when all players have finished playing
    camera.position.x =0;
    camera.position.y = 0;
     
    imageMode(CENTER);
    Runner.getRunnerInfo();//the rank and all info about players are in allPlayers

    image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(gold_img, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){//checking which players rank is 1
        text("1st Position:  "+allPlayers[plr].name,0,85);
      }
      else if(allPlayers[plr].rank === 2){
        text("2nd Position: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }else if(allPlayers[plr].rank === 3){
        text("3rd Position: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
    }else{
        textSize(30);
        text("4th Position: " + allPlayers[plr].name, 0, 225); //allPlayers[plr].rank is the leftout rank=4
    }
    }
  }
}
