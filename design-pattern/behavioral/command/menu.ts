// 命令的发送者： UI编写，暴露出onClick接口
export class Button {
  public onClick: (...args: any[]) => string = () => 'nothing'

  public addClick<T>(command: Command<T>) {
    this.onClick = function () {
      return command.execute()
    }
  }
}

// 命令的接收者：每个接收者封装着按钮的点击逻辑
export class MenuBar {
  public refresh(): string {
    return 'refresh MenuBar'
  }
}

export class SubMenu {
  public add(): string {
    return 'add SubMenu'
  }

  public delete(): string {
    return 'delete SubMenu'
  }
}

// 命令对象基类
abstract class Command<T> {
  protected abstract receiver: T
  public abstract execute(): string
}

// 命令对象
export class RefreshMenuBar extends Command<MenuBar> {
  protected receiver: MenuBar
  public constructor(receiver: MenuBar) {
    super()
    this.receiver = receiver
  }

  public execute(): string {
    return this.receiver.refresh()
  }
}

export class AddSubMenu extends Command<SubMenu> {
  protected receiver: SubMenu

  public constructor(receiver: SubMenu) {
    super()
    this.receiver = receiver
  }

  public execute(): string {
    return this.receiver.add()
  }
}

export class DeleteSubMenu extends Command<SubMenu> {
  protected receiver: SubMenu

  public constructor(receiver: SubMenu) {
    super()
    this.receiver = receiver
  }

  public execute(): string {
    return this.receiver.delete()
  }
}
