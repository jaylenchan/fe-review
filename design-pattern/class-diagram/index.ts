class Water {}

/**
 * Animal-->Water 依赖关系：Water实例是Animal实例的属性
 */
class Animal {
  public age: number
  public water: Water
  constructor(age: number) {
    this.age = age
    this.water = new Water()
  }
  public eat() {}
}

interface egg {
  makeEgg(): void
}

/**
 * Bird——▷Animal 泛化关系：继承
 * Bird--▷egg 实现关系：接口
 */
class Bird extends Animal implements egg {
  public feather: string
  constructor(age: number, feather: string) {
    super(age)
    this.feather = feather
  }

  makeEgg(): void {
    console.log('make egg')
  }
}

class TangFather {}
class TangWife {}
class TangChild {}
class TangFriend {}
class TangHouse {}
/**
 * TangDark——▷Bird 泛化关系：继承
 * TangDark1——1TangFather 关联关系：TangFather实例是TangDark实例的属性
 * TangDark1——0,1TangWife 关联关系：TangWife实例是TangDark实例的属性
 * TangDark1——0..2TangChild 关联关系：TangChild构成的数组是TangDark实例的属性
 * TangDark1——0..*Tangfriend 关联关系：Tangfriend构成的数组或者null是TangDark实例的属性
 * TangDark1——1..*TangHouse 关联关系：TangHouse构成的数组是TangDark实例的属性
 */
class TangDark extends Bird {
  public father: TangFather
  public wife: null | TangWife
  public children: null | Array<TangChild>
  public friends: null | Array<TangFriend>
  public house: Array<TangHouse>
  constructor(age: number, feather: string) {
    super(age, feather)
    this.father = new TangFather()
    this.wife = new TangWife()
    this.children = [new TangChild(), new TangChild()]
    this.friends = null
    this.house = [new TangHouse()]
  }
}

class Kidney {}

/**
 * Kidney——◆BigBird 组合关系：肾的实例构成的数组是大雁实例的属性
 */
class BigBird extends Bird {
  public kidneys: Array<Kidney>
  constructor(age: number, feather: string) {
    super(age, feather)
    this.kidneys = [new Kidney(), new Kidney()]
  }
}

/**
 * BigBird——◇BigBridGroup 聚合关系：大雁构成的数组是大雁群的属性
 */
class BigBridGroup {
  public bigBirds: Array<BigBird>
  constructor() {
    this.bigBirds = [new BigBird(1, 'feather'), new BigBird(2, 'feather')]
  }
}
