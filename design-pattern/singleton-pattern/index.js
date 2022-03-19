"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
class Instance {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
exports.Instance = Instance;
class Singleton {
    constructor(name) {
        if (!Singleton.instance) {
            Singleton.instance = new Instance(name);
        }
        return Singleton.instance;
    }
}
exports.default = Singleton;
