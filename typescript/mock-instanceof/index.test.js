"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('mock instanceof', () => {
    test('Array instanceof Object is true, because Array.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype ', () => {
        expect((0, index_1.default)(Array, Object)).toBe(true);
    });
    test('Object intanceof Object true, becuase Object.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype ', () => {
        expect((0, index_1.default)(Object, Object)).toBe(true);
    });
    test('Function instanceof Function is true, because Function.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototye', () => {
        expect((0, index_1.default)(Function, Function)).toBe(true);
    });
    test('Function instanceof Object is true, because Function.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype', () => {
        expect((0, index_1.default)(Function, Object)).toBe(true);
    });
    test('arr instanceof Object is true, because arr.__proto__ === Array.prototype, Array.prototype.__proto__ === Object.prototype', () => {
        const arr = new Array();
        expect((0, index_1.default)(arr, Object)).toBe(true);
    });
    test('fn instanceOf Object  is true , because fn.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype', () => {
        const fn = new Function();
        expect((0, index_1.default)(fn, Object)).toBe(true);
    });
    test.skip('Object.prototype instanceof null throw error, because null can not be a constructor! ', () => { });
});
