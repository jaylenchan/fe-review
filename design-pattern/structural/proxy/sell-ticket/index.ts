/**
 * 火车站卖火车票
 * 如果要买火车票，最直接的方式就是坐车到火车站，然后在火车站售票厅排队买票。
 * 但其实火车站都有很多代理卖票点，我们去代售点买票即可，而不需要直接到火车站买票。
 * 这里，火车站就是目标对象，代售点就是代理对象
 */

/**
 * 抽象主题类：一套规范，它是一个接口或者抽象类，用来声明真实主题类和代理类需要实现的业务方法
 */
interface SellTicket {
  sell(): void
}

/**
 * 真实主题类：代理对象所最终要引用的对象，用来实现抽象主题类中定义的业务方法
 */
class TrainStation implements SellTicket {
  public sell(): void {
    console.log('火车站卖票')
  }
}

/**
 * 代理类：提供跟真实主题类相同的接口，引用真实主题对象，用来访问，控制，增强真实主题的功能
 * 
 * 通过代理对象聚合了目标对象的方式，形成了一个更大的结构
 */
class ProxySell implements SellTicket {
  // 持有目标对象的引用
  constructor(public trainStation: TrainStation) {}

  public sell(): void {
    this.trainStation.sell()
  }
}

// 客户端使用
const proxySell = new ProxySell(new TrainStation())
proxySell.sell()
