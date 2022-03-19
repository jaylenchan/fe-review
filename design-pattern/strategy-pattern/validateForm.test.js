"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 需求：假设我们正在编写一个注册的页面,在点击注册按钮之前,有如下几条校验逻辑：
 * 1. 用户名不能为空
 * 2. 密码长度不能少于 6 位
 * 3. 手机号码必须符合格式
 * 使用策略模式编写一段代码，完成以上的校验逻辑。
 */
const validateForm_1 = __importStar(require("./validateForm"));
describe('test validate form', () => {
    test('valid Form', () => {
        const form = new validateForm_1.Form('jaylen', '123456', '13332084354');
        const validator = new validateForm_1.default(form, {
            username: [new validateForm_1.IsEmpty()],
            password: [new validateForm_1.IsMinlength()],
            phone: [new validateForm_1.IsMobile()]
        });
        const validateResult = validator.validate();
        expect(validateResult.username['isEmpty']).toBe(true);
        expect(validateResult.password['isMinLength']).toBe(true);
        expect(validateResult.phone['isMobile']).toBe(true);
    });
    test('inValid Form', () => {
        const form = new validateForm_1.Form('', '123', '11111111');
        const validator = new validateForm_1.default(form, {
            username: [new validateForm_1.IsEmpty()],
            password: [new validateForm_1.IsMinlength()],
            phone: [new validateForm_1.IsMobile()]
        });
        const validateResult = validator.validate();
        expect(validateResult.username['isEmpty']).toBe(false);
        expect(validateResult.password['isMinLength']).toBe(false);
        expect(validateResult.phone['isMobile']).toBe(false);
    });
});
