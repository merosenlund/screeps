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
    spawn: function(room, stage) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);
        console.log(room.name, ' Builders: ', builders.length);

        if (builders.length < stages[stage].count) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room, stage) {
            let name = 'Builder' + Game.time;
            let body = stages[stage].body;
            let memory = {role: 'builder', hasEnergy: false};

            return {name, body, memory};
    }
};

var stages = {
    1: {
        count: 0,
    },
    2: {
        count: 0,
    }
}

module.exports = roleBuilder;