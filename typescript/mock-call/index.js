"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockCall(context, ...args) {
    context['fn'] = this;
    const result = context['fn'](...args);
    Reflect.deleteProperty(context, 'fn');
    return result;
}
exports.default = mockCall;
