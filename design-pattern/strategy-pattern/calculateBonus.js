"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceB = exports.PerformanceA = exports.PerformanceS = void 0;
class PerformanceS {
    calculate(salary) {
        return salary * 4;
    }
}
exports.PerformanceS = PerformanceS;
class PerformanceA {
    calculate(salary) {
        return salary * 3;
    }
}
exports.PerformanceA = PerformanceA;
class PerformanceB {
    calculate(salary) {
        return salary * 2;
    }
}
exports.PerformanceB = PerformanceB;
class Bonus {
    constructor(salary, performance) {
        this.salary = salary;
        this.performance = performance;
    }
    getBonus() {
        return this.performance.calculate(this.salary);
    }
}
exports.default = Bonus;
