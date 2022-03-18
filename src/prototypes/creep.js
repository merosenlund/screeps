Creep.prototype.sayHello = function sayHello() {
    this.say("Hello", true);
}

Creep.prototype.checkEnergy = function decide() {
    if (this.store.getFreeCapacity() == 0) {
        this.memory.hasEnergy = true;
    } else if (this.store[RESOURCE_ENERGY] == 0) {
        this.memory.hasEnergy = false;
    }
}

Creep.prototype.goHarvest = function harvest() {
    this.say("HARVESTING!!!!");
}

Creep.prototype.goFillUp = function fillUp() {
    var energyStores = this.room.find(FIND_MY_STRUCTURES, {
        filter: (s) => {
            return ((
                    s.structureType == STRUCTURE_SPAWN || 
                    s.structureType == STRUCTURE_EXTENSION
                ) && s.store[RESOURCE_ENERGY] >= 50
            );
        }
    });
    let target = this.pos.findClosestByRange(energyStores)
    if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}

Creep.prototype.goBuild = function build() {
    this.say("BUILDING!!!!");
    const target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if(target) {
        if(this.build(target) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    }
}

Creep.prototype.goRepair = function repair() {
    this.say("REPAIRIING!!!!");
}