var roleWallEngineer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.checkEnergy()
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.hasEnergy) {
            creep.goFillUp()
        }
        else {
            const needsRepaired = creep.room.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < 10000 && structure.structureType == STRUCTURE_WALL
                }
            });
            const target = creep.pos.findClosestByRange(needsRepaired);
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var wallEngineers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallEngineer' && creep.room.name == room.name);
        console.log('Wall Engineers: ' + wallEngineers.length, room.name);
        if (wallEngineers.length < 1) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'WallEngineer' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'wallEngineer', hasEnergy: false};

            return {name, body, memory};
    }
};

module.exports = roleWallEngineer;