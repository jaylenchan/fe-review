class CPU {
  startup() {
    console.log('开启cpu')
  }

  shutdown() {
    console.log('关闭cpu')
  }
}

class Memory {
  startup() {
    console.log('开启内存')
  }

  shutdown() {
    console.log('关闭内存')
  }
}

class Disk {
  startup() {
    console.log('开启硬盘')
  }

  shutdown() {
    console.log('关闭硬盘')
  }
}

class Computer {
  private cpu: CPU
  private memory: Memory
  private disk: Disk
  constructor() {
    this.cpu = new CPU()
    this.memory = new Memory()
    this.disk = new Disk()
  }

  startup() {
    this.cpu.startup()
    this.memory.startup()
    this.disk.startup()
  }

  shutdown() {
    this.cpu.shutdown()
    this.memory.shutdown()
    this.disk.shutdown()
  }
}

const computer = new Computer()
computer.startup()
computer.shutdown()
