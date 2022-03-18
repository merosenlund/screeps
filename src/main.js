let creepLogic = require('./creeps');
let roomLogic = require('./room');
let prototypes = require('./prototypes');


module.exports.loop = function () {
    // make a list of all of our rooms
    Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);

    // run spwan logic for each room in our empire
    _.forEach(Game.myRooms, (r) => {
        roomLogic.spawning(r);
        console.log(r.name, " Energy: ", r.energyAvailable, "/", r.energyCapacityAvailable);
    });
    
    // run each creep role see /creeps/index.js
    let sourceCounter = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // Quick and dirty way to split the screeps between sources automatically
        let source = sourceCounter % 2
        sourceCounter++

        let role = creep.memory.role;
        if (creepLogic[role]) {
            creepLogic[role].run(creep, source);
        }
    }

    // free up memory if creep no longer exists
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    console.log(Game.cpu.bucket);
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
}