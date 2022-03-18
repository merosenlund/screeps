var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let stage = creep.room.memory.stage
        creep.checkEnergy()
        if(!creep.memory.hasEnergy) {
            creep.goHarvest();
        }
        else if (stage === 1) {
            let storageSites = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            let target = creep.pos.findClosestByPath(storageSites)
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.goHarvest();
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room, stage) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < stages[stage].count) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room, stage) {
            let name = 'Harvester' + Game.time;
            console.log(stage)
            let body = stages[stage].body;
            let memory = {role: 'harvester', hasEnergy: false};
        
            return {name, body, memory};
    }
};

var stages = {
    1: {
        body: [WORK, CARRY, MOVE],
        count: 5,
    },
    2: {
        body: [WORK, WORK, WORK, WORK, WORK, MOVE],
        count: 2,
    }
}



module.exports = harvester;