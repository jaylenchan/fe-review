"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: 'ts-jest',
    automock: false,
    clearMocks: true,
    testEnvironment: 'jsdom',
    coverageProvider: 'v8',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)']
};
