"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchError = exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchData = () => {
    return axios_1.default.get('http://www.dell-lee.com/react/api/demo.json').then((res) => res.data);
};
exports.fetchData = fetchData;
const fetchError = () => {
    return axios_1.default.get('http://www.dell-lee.com/react/api/error.json').then((res) => res.data);
};
exports.fetchError = fetchError;
