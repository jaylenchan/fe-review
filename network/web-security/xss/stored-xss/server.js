"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
const comments = [
    {
        username: '章三',
        content: '我是李思',
        avatar: 'https://avatars.githubusercontent.com/u/72691225?v=4',
        time: new Date().toLocaleString()
    },
    {
        username: '帅到没祖先',
        content: '我宣布abcd',
        avatar: 'https://avatars.githubusercontent.com/u/94287306?v=4',
        time: new Date().toLocaleString()
    },
    {
        username: 'Ruster',
        content: 'what the fuck?',
        avatar: 'https://avatars.githubusercontent.com/u/94676967?s=200&v=4',
        time: new Date().toLocaleString()
    }
];
// 这个是获取所有当前评论的api接口
app.get('/api/comments', (_req, res) => {
    res.json({
        code: 0,
        data: comments
    });
});
app.post('/api/comments', (req, res) => {
    const comment = req.body;
    comments.push({
        username: comment.username,
        content: comment.content,
        avatar: 'https://avatars.githubusercontent.com/u/72691225?v=4',
        time: new Date().toLocaleString()
    });
    res.json({
        code: 0,
        data: {}
    });
});
app.listen(8080, () => {
    console.log('服务器启动中[8080]...');
});
