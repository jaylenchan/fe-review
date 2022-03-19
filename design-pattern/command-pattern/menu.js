"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSubMenu = exports.AddSubMenu = exports.RefreshMenuBar = exports.SubMenu = exports.MenuBar = exports.Button = void 0;
// 命令的发送者： UI编写，暴露出onClick接口
class Button {
    constructor() {
        this.onClick = () => 'nothing';
    }
    addClick(command) {
        this.onClick = function () {
            return command.execute();
        };
    }
}
exports.Button = Button;
// 命令的接收者：每个接收者封装着按钮的点击逻辑
class MenuBar {
    refresh() {
        return 'refresh MenuBar';
    }
}
exports.MenuBar = MenuBar;
class SubMenu {
    add() {
        return 'add SubMenu';
    }
    delete() {
        return 'delete SubMenu';
    }
}
exports.SubMenu = SubMenu;
// 命令对象基类
class Command {
}
// 命令对象
class RefreshMenuBar extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }
    execute() {
        return this.receiver.refresh();
    }
}
exports.RefreshMenuBar = RefreshMenuBar;
class AddSubMenu extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }
    execute() {
        return this.receiver.add();
    }
}
exports.AddSubMenu = AddSubMenu;
class DeleteSubMenu extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }
    execute() {
        return this.receiver.delete();
    }
}
exports.DeleteSubMenu = DeleteSubMenu;
