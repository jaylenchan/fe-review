"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 需求：公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。其中
 * 绩效为S，年终奖为4倍工资
 * 绩效为A，年终奖为3倍工资
 * 绩效为B，年终奖为2倍工资
 * 每个人都必定有年终奖，绩效最低给B，使用策略模式编写一段代码计算每个员工拿到的奖金数额
 */
const calculateBonus_1 = __importStar(require("./calculateBonus"));
describe('test calculate bonus', () => {
    test('salary 10000, performance S', () => {
        const salary = 10000;
        const performanceS = new calculateBonus_1.PerformanceS();
        const bonus = new calculateBonus_1.default(salary, performanceS);
        expect(bonus.getBonus()).toBe(40000);
    });
    test('salary 10000, performance A', () => {
        const salary = 10000;
        const performanceA = new calculateBonus_1.PerformanceA();
        const bonus = new calculateBonus_1.default(salary, performanceA);
        expect(bonus.getBonus()).toBe(30000);
    });
    test('salary 10000, performance B', () => {
        const salary = 10000;
        const performanceB = new calculateBonus_1.PerformanceB();
        const bonus = new calculateBonus_1.default(salary, performanceB);
        expect(bonus.getBonus()).toBe(20000);
    });
});
