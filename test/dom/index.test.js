"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const jquery_1 = __importDefault(require("jquery"));
describe('test dom', () => {
    test('addDivToBody调用两次后，body中的div数量应该为2', () => {
        (0, index_1.addDivToBody)();
        (0, index_1.addDivToBody)();
        const divNums = (0, jquery_1.default)('body').find('div').length;
        expect(divNums).toBe(2);
    });
});
