"use strict";
describe('common matchers', () => {
    test('toBe: 我觉得xxx应该是xxx。在你期望的值是某个数据类型的值的时候使用，常用在基础类型值上', () => {
        const count = 1;
        expect(count).toBe(1);
    });
    test('toEqual: 我觉得xxx应该长成xxx样。在你期望的对象长成某个样子的时候使用，常用在引用类型值上', () => {
        const obj = {
            name: 'obj'
        };
        expect(obj).toEqual({
            name: 'obj'
        });
    });
});
