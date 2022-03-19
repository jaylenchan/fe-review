"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setProto(obj, objProto) {
    Reflect.setPrototypeOf(obj, objProto);
}
function mockNew(objConstructor, ...args) {
    /**
     * 目标：
     * 生成的新对象要能够访问objConstructor中写的this.xxx中的xxx属性
     * 生成的新对象要能够访问objConstructor.prototype.bbb中的bbb属性
     * 返回判断：
     * 如果是对象实例直接显示返回， 否则返回obj
     */
    const obj = new Object();
    // 生成的新对象要能够访问objConstructor中写的this.xxx中的xxx属性
    const result = objConstructor.call(obj, ...args);
    // 生成的新对象要能够访问objConstructor.prototype.bbb中的bbb属性
    setProto(obj, objConstructor.prototype);
    // 如果是对象实例直接显示返回， 否则返回obj
    return result instanceof Object ? result : obj;
}
exports.default = mockNew;
