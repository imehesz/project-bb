if (typeof TAFFY !== "function") throw "TAFFY is not present!";

let singleton = Symbol();
let singletonEnforcer = Symbol();

class DbModule {
  constructor (enforcer) {
    if(enforcer != singletonEnforcer) {
      throw "Cannot construct a singleton!";
    }
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new DbModule(singletonEnforcer);
    }
    return this[singleton];
  }

  get taffy() {
    return TAFFY;
  }
}

module.exports = DbModule;
