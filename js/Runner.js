class Runner {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;//for ranking
  }

  getCount(){
    var runnerCountRef = database.ref('runnerCount');
    runnerCountRef.on("value",(data)=>{
      runnerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      runnerCount: count
    });
  }

  update(){
    var runnerIndex = "runners/runner" + this.index;
    database.ref(runnerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank //rank is also set
    });
  }

  getFinishedRunners(){
    var finishedRunnerRef = database.ref('finishedRunners');
    finishedRunnerRef.on("value",(data)=>{
        finishedRunners = data.val();
    });
}
static updateFinishedRunners(){
  database.ref('/').update({
      finishedRunners: finishedRunners + 1//increase count for finishedPlayer in database node 
  });
  //this.rank += 1;//increase player.rank
}

  static getRunnerInfo(){
    var runnerInfoRef = database.ref('runners');
    runnerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  
}
