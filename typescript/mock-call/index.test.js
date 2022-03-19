"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('mock-call', () => {
    test('call', () => {
        const jaylen = {
            name: 'jaylen'
        };
        const showName = function (name) {
            return this['name'] == name;
        };
        showName.mockCall = index_1.default;
        expect(showName.mockCall(jaylen, 'jaylen')).toBe(true);
        expect(jaylen).toEqual({
            name: 'jaylen'
        });
    });
});
