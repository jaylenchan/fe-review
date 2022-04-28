/**
 * 需求：现在有三个按钮，功能是刷新菜单，添加子菜单，删除子菜单。
 * 你需要分别扮演两种角色：
 * 角色1:负责开发UI界面，暴露出按钮点击的接口即可
 * 角色2:负责开发三个按钮点击后执行的业务逻辑
 *
 * 使用命令模式编写一段代码模拟上面的需求使得测试通过✅
 */

import {
  Button,
  MenuBar,
  SubMenu,
  RefreshMenuBar,
  AddSubMenu,
  DeleteSubMenu
} from './menu'

describe('menu', () => {
  const menuBar = new MenuBar()
  const subMenu = new SubMenu()
  test('refresh menu', () => {
    const refreshButton = new Button()
    const refreshCommand = new RefreshMenuBar(menuBar)

    refreshButton.addClick(refreshCommand)

    expect(refreshButton.onClick()).toBe('refresh MenuBar')
  })

  test('add subMenu', () => {
    const addButton = new Button()
    const addCommand = new AddSubMenu(subMenu)

    addButton.addClick(addCommand)

    expect(addButton.onClick()).toBe('add SubMenu')
  })

  test('delete subMenu', () => {
    const deleteButton = new Button()
    const deleteCommand = new DeleteSubMenu(subMenu)

    deleteButton.addClick(deleteCommand)

    expect(deleteButton.onClick()).toBe('delete SubMenu')
  })
})
