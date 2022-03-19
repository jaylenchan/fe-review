"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('./index');
const index_1 = require("./index");
describe('mock implement', () => {
    test('使用__mocks__+jest.mock(./index)替换./index中的fetchData的实现，因此返回值应该是{name: "jaylen"}', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, index_1.fetchData)();
        expect(data).toMatchObject({
            name: 'jaylen'
        });
    }));
});
describe('use actual', () => {
    const { useActual } = jest.requireActual('./index');
    test('useActual调用后返回值应该是"Actual"', () => {
        expect(useActual()).toBe('Actual');
    });
});
