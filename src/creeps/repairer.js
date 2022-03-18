var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.checkEnergy()
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.hasEnergy) {
            creep.goFillUp()
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
                }
            });
            const target = creep.pos.findClosestByRange(targets);
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
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == room.name);
        console.log('Repairers: ' + repairers.length, room.name);

        if (repairers.length < 1) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Repairer' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'repairer', hasEnergy: false};

            return {name, body, memory};
    }
};

module.exports = roleRepairer;