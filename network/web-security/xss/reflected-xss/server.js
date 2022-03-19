"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
const goods = {
    books: [
        {
            name: '变形记'
        },
        {
            name: ' 哆啦A梦'
        },
        {
            name: '汤姆索亚历险记'
        }
    ],
    electronic: [
        {
            name: 'ipad'
        },
        {
            name: 'iphone'
        },
        {
            name: '华为'
        }
    ]
};
app.get('/goods', (req, res) => {
    const { category } = req.query;
    const curGoods = goods[category];
    let detail = '';
    if (curGoods) {
        detail = curGoods
            .map((item) => `
     <li>${item.name}</li>
     `)
            .join('');
    }
    else {
        detail = '不存在该分类的商品';
    }
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.send(`
   <!DOCTYPE html>
   <html lang="en">
     <body>
       <h1>你选择的商品分类是${category}</h1>
       ${detail}
     </body>
   </html>
  `);
});
app.listen(8080, () => {
    console.log('服务器启动中[8080]...');
});
