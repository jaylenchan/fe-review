"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = exports.runCallback = void 0;
const runCallback = function (callback) {
    callback();
};
exports.runCallback = runCallback;
const forEach = function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
};
exports.forEach = forEach;
