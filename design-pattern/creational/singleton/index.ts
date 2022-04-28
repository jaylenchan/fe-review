export class Instance {
  private name: string

  public constructor(name: string) {
    this.name = name
  }

  public getName() {
    return this.name
  }
}

export default class Singleton {
  private static instance: Instance

  constructor(name: string) {
    if (!Singleton.instance) {
      Singleton.instance = new Instance(name)
    }
    return Singleton.instance
  }
}
