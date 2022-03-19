"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockApply(context, arr) {
    context['fn'] = this;
    const result = context['fn'](...arr);
    Reflect.deleteProperty(context, 'fn');
    return result;
}
exports.default = mockApply;
