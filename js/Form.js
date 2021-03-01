class Form {

  constructor() {
    this.input = createInput("").attribute("placeholder", "Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  enter() {
    this.title.hide();
    this.input.hide();
    this.button.hide();

    runner.name = this.input.value();
    runnerCount++;
    runner.index = runnerCount;
    runner.update();
    runner.updateCount(runnerCount);

    this.greeting.html("Welcome " + runner.name + "!");
    this.greeting.position(displayWidth / 2.1 - runner.name.length * (displayWidth / 110),125);
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      runner.name = this.input.value();//get the name value enetered by the player in the input field
      runnerCount+=1;//Since one more user has registered, playerCount should be increased
      runner.index = runnerCount;//current playerCount will be the index of the current player
      runner.update();//update name
      runner.updateCount(runnerCount);
      this.greeting.html("Welcome " + runner.name + "!");
      this.greeting.position(displayWidth/2.1 - runner.name.length * (displayWidth / 110),125);
    });

    this.reset.mousePressed(()=>{
      runner.updateCount(0);
      game.update(0);
      database.ref('/').update({
        runners: null,//even if this line is not used, set in player.update will modify it
        finishedRunners: 0
      })
    });
  }
}
