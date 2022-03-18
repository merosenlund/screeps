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

Creep.prototype.goFillUp = function fillUp(source) {
    var sources = this.room.find(FIND_SOURCES);
    if(this.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
        this.moveTo(sources[source]);
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