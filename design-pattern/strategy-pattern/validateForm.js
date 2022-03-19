"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMinlength = exports.IsMobile = exports.IsEmpty = exports.Form = void 0;
class Form {
    constructor(username, password, phone) {
        this.username = username;
        this.password = password;
        this.phone = phone;
    }
}
exports.Form = Form;
class IsEmpty {
    constructor() {
        this.name = 'isEmpty';
    }
    validate(formItem) {
        if (formItem === '') {
            return false;
        }
        return true;
    }
}
exports.IsEmpty = IsEmpty;
class IsMobile {
    constructor() {
        this.name = 'isMobile';
    }
    validate(formItem) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(formItem)) {
            return false;
        }
        return true;
    }
}
exports.IsMobile = IsMobile;
class IsMinlength {
    constructor() {
        this.name = 'isMinLength';
    }
    validate(formItem) {
        if (formItem.length < 6) {
            return false;
        }
        return true;
    }
}
exports.IsMinlength = IsMinlength;
class Validator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }
    validate() {
        const validateResult = {};
        Reflect.ownKeys(this.rules).forEach((formItem) => {
            var _a;
            (_a = this.rules[formItem]) === null || _a === void 0 ? void 0 : _a.forEach((rule) => {
                if (!validateResult[formItem]) {
                    validateResult[formItem] = {};
                }
                validateResult[formItem][rule.name] = rule.validate(this.form[formItem]);
            });
        });
        return validateResult;
    }
}
exports.default = Validator;
