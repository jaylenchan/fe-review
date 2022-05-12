/**
 *
 */

interface ITFCard {
  readTF(): string
  writeTF(msg: string): void
}

/**
 * 适配者类
 */
class TFCard implements ITFCard {
  readTF(): string {
    return 'Read TFCard'
  }

  writeTF(msg: string): void {
    console.log('Write TFCard', msg)
  }
}

/**
 * 目标接口：一个抽象类或者接口，用来定义客户端要使用的接口
 */
interface ISDCard {
  readSD(): string
  writeSD(msg: string): void
}

class SDCard implements ISDCard {
  readSD(): string {
    return 'Read SDCard'
  }
  writeSD(msg: string): void {
    console.log('Write SDCard', msg)
  }
}

/**
 * 适配器类：把适配者的接口转换成符合客户端使用要求的接口
 */
class SDAdapter extends TFCard implements ISDCard {
  readSD(): string {
    return super.readTF()
  }
  writeSD(msg: string): void {
    super.writeTF(msg)
  }
}

/**
 *
 */
export class Computer {
  public readSD(sdCard: SDCard): string {
    return sdCard.readSD()
  }

  public writeSD(sdCard: SDCard, msg: string): void {
    sdCard.writeSD(msg)
  }
}

// 客户端访问
const computer = new Computer()
// computer.readSD(new SDCard())
const content = computer.readSD(new SDAdapter())
console.log(content)
computer.writeSD(new SDAdapter(), 'sdadapter')
