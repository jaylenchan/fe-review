"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActual = exports.fetchData = void 0;
const fetchData = () => {
    return Promise.resolve({
        name: 'jaylen'
    });
};
exports.fetchData = fetchData;
const useActual = () => 'Fake';
exports.useActual = useActual;
