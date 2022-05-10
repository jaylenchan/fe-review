class Socket {
  output() {
    return '220V'
  }
}

abstract class Power {
  abstract charge(): string
}

class PowerAdapter extends Power {
  constructor(public socket: Socket) {
    super()
  }

  // 转换后的接口和转换前的不同
  charge() {
    return this.socket.output() + '转换为24V'
  }
}

const adapter = new PowerAdapter(new Socket())
console.log(adapter.charge())
