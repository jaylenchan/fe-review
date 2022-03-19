"use strict";
describe('string matchers', () => {
    test('toMatch：str应该包含string和matchers子串', () => {
        const str = 'string-matchers';
        expect(str).toMatch('string');
        expect(str).toMatch(/matchers/);
    });
});
