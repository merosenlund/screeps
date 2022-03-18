var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, source) {
        creep.checkEnergy()
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.hasEnergy) {
            creep.goFillUp(source)
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
        console.log('Upgraders: ' + upgraders.length, room.name);

        if (upgraders.length < 3) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader', hasEnergy: false};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;