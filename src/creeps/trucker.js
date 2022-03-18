var harvester = {

    /** @param {Creep} creep **/
    run: function(creep, source) {
        if(creep.store.getFreeCapacity() > 0) {
            creep.goFillUp(source)
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
            if(creep.transfer(storageSites[source], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageSites[source]);
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 1) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;