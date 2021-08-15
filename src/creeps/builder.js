var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        } else if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
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
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);
        console.log('Builders: ' + builders.length, room.name);

        if (builders.length < 1) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Builder' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'builder', building: true};
        
            return {name, body, memory};
    }
};

module.exports = roleBuilder;