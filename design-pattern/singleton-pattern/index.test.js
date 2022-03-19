"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('test singleton pattern', () => {
    test('singleton', () => {
        const instance1 = new index_1.default('jaylen1');
        const instance2 = new index_1.default('jaylen2');
        const instance3 = new index_1.default('jaylen3');
        expect(instance1).toBe(instance2);
        expect(instance2).toBe(instance3);
        expect(instance3).toBe(instance1);
    });
    test('same name', () => {
        const instance1 = new index_1.default('jaylen1');
        const instance2 = new index_1.default('jaylen2');
        const instance3 = new index_1.default('jaylen3');
        expect(instance1.getName()).toBe('jaylen1');
        expect(instance2.getName()).toBe('jaylen1');
        expect(instance3.getName()).toBe('jaylen1');
    });
});
