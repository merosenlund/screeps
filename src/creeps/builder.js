var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.checkEnergy()
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.hasEnergy) {
            creep.goFillUp()
        }
        else {
            creep.build();
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);
        console.log('Builders: ' + builders.length, room.name);

        if (builders.length < 0) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Builder' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'builder', hasEnergy: false};

            return {name, body, memory};
    }
};

module.exports = roleBuilder;