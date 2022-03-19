"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDivToBody = void 0;
const jquery_1 = __importDefault(require("jquery"));
const addDivToBody = () => {
    (0, jquery_1.default)('body').append('<div>DIV</div>');
};
exports.addDivToBody = addDivToBody;
