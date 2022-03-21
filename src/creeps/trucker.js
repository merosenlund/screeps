var trucker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            let resources = creep.room.find(FIND_DROPPED_RESOURCES)
            let target = _.filter(resources, (r) => r.amount > 150)
            if (creep.pickup(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0])
            }
        }
        else {
            let storageSites = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(creep.transfer(storageSites[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageSites[0]);
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room, stage) {
        var truckers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trucker' && creep.room.name == room.name);
        console.log('Truckers: ' + truckers.length, room.name);

        if (truckers.length < stages[stage].count) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room, stage) {
            let name = 'Trucker' + Game.time;
            let body = stages[stage].body;
            let memory = {role: 'trucker'};
        
            return {name, body, memory};
    }
};

var stages = {
    1: {
        count: 0,
    },
    2: {
        body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        count: 4,
    }
}

module.exports = trucker;