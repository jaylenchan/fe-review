"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
const timer = (callback) => {
    setTimeout(() => {
        callback();
    }, 3000);
};
exports.timer = timer;
