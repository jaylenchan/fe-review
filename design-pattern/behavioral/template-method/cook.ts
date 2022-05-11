/**
 * 炒菜
 * 步骤：倒油 -> 热油 -> 倒菜 -> 放调料 -> 翻炒
 * 其中除了倒菜 -> 放调料，其他步骤都是完全一致的
 */

/**
 * 抽象类定义模板方法和基本方法
 */
abstract class Cook {
  // 模板方法
  // 炒菜步骤
  cook(): void {
    this.pourOil()
    this.heatOil()
    this.pourVegetable()
    this.pourSauce()
    this.fry()
  }

  // 基本方法 - 具体方法
  // 倒油
  pourOil(): void {
    console.log('倒油')
  }

  // 基本方法 - 具体方法
  // 热油
  heatOil(): void {
    console.log('热油')
  }

  // 基本方法 - 抽象方法
  // 倒菜
  abstract pourVegetable(): void

  // 基本方法- 抽象方法
  // 放调料
  abstract pourSauce(): void

  // 基本方法 - 具体方法
  // 炒菜
  fry(): void {
    console.log('炒菜')
  }
}

// 炒菜心
class FryCaixin extends Cook {
  pourVegetable(): void {
    console.log('倒菜心')
  }

  pourSauce(): void {
    console.log('倒蚝油')
  }
}

// 炒包菜
class FryBaocai extends Cook {
  pourVegetable(): void {
    console.log('倒包菜')
  }

  pourSauce(): void {
    console.log('倒醋')
  }
}

const cookCaixin = new FryCaixin()
const cookBaocai = new FryBaocai()

console.log('----------开始炒菜心----------')
cookCaixin.cook()
console.log('----------开始炒包菜----------')
cookBaocai.cook()
