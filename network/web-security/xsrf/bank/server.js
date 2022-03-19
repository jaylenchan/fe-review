"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
// 模拟数据库users
const users = [
    {
        username: 'a',
        password: 'a',
        balance: 1000
    },
    {
        username: 'b',
        password: 'b',
        balance: 1000
    }
];
const sessions = {};
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    function getUser() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username &&
                users[i].password === password) {
                return users[i];
            }
        }
        return null;
    }
    const user = getUser();
    if (user) {
        // 登录成功,设置cookie和session
        const sessionId = `session-${Date.now() + Math.random() * 1000}`;
        sessions[sessionId] = {
            user
        };
        res.cookie('sessionId', sessionId);
        res.json({
            code: 0
        });
    }
    else {
        res.json({
            code: 1,
            error: '用户名或密码错误'
        });
    }
});
app.get('/api/userinfo', (req, res) => {
    const session = sessions[req.cookies.sessionId];
    if (session && session.user) {
        res.json({
            code: 0,
            user: session.user
        });
    }
    else {
        res.json({
            code: 1,
            error: '用户未登录'
        });
    }
});
app.post('/api/transfer', (req, res) => {
    const session = sessions[req.cookies.sessionId];
    console.log('session=>', req.cookies.sessionId);
    if (session && session.user) {
        let { target, amount } = req.body;
        amount = isNaN(amount) ? 0 : Number(amount);
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === session.user.username) {
                ;
                users[i].balance -= amount;
            }
            else if (users[i].username === target) {
                ;
                users[i].balance += amount;
            }
        }
        res.json({
            code: 0
        });
    }
    else {
        res.json({
            code: 1,
            error: '用户未登录'
        });
    }
});
app.listen(8080, () => {
    console.log('银行服务器启动中[8080]...');
});
