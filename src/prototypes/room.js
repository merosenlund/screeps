Room.prototype.checkStage = function checkStage() {
    /*
    Amount of creeps, if there aren't any creeps then stage gets set to one
    Amount of energy capacity, as we have more energy available we can increase the stage
    */
   // Number of creeps
   let creepCount = this.find(FIND_MY_CREEPS).length;
   // Energy capacity for the room
   let energyCount = this.energyCapacityAvailable;
   if (creepCount === 0) {
       this.setStage(0);
   } else {
       stage = Math.floor(energyCount / 300)
       this.setStage(stage);
   }
}

Room.prototype.setStage = function setStage(stage) {
    this.memory.stage = stage;
}