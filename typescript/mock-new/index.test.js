"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('mock new', () => {
    test('jaylen.name === "jaylen"', () => {
        function Person(name) {
            // @ts-ignore
            this.name = name;
        }
        const jaylen = (0, index_1.default)(Person, 'jaylen');
        expect(jaylen['name']).toBe('jaylen');
    });
    test('jaylen.sayName() === "jaylen"', () => {
        function Person(name) {
            //@ts-ignore
            this.name = name;
        }
        Person.prototype.sayName = function () {
            return this.name;
        };
        const jaylen = (0, index_1.default)(Person, 'jaylen');
        expect(jaylen['sayName']()).toBe('jaylen');
    });
    test('jaylen.name === jaylen, because Person constructor return an primitive type', () => {
        function Person(name) {
            //@ts-ignore
            this.name = name;
            return name;
        }
        const jaylen = (0, index_1.default)(Person, 'jaylen');
        expect(jaylen['name']).toBe('jaylen');
    });
    test('jaylen.name === ashely, because Person constructor return an Object type', () => {
        function Person(name) {
            //@ts-ignore
            this.name = name;
            return {
                name: 'ashely'
            };
        }
        const jaylen = (0, index_1.default)(Person, 'jaylen');
        expect(jaylen['name']).toBe('ashely');
    });
});
