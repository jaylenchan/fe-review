"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('mock apply', () => {
    test('apply', () => {
        const jaylen = {
            name: 'jaylen'
        };
        const showName = function (age, nickName) {
            return `${this['name']}-${age}-${nickName}`;
        };
        showName.mockApply = index_1.default;
        expect(showName.mockApply(jaylen, ['11', 'xiaowang'])).toBe('jaylen-11-xiaowang');
        expect(jaylen).toEqual({
            name: 'jaylen'
        });
    });
});
