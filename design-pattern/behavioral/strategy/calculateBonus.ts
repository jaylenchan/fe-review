interface ICalculate {
  calculate(salary: number): number
}

export class PerformanceS implements ICalculate {
  public calculate(salary: number): number {
    return salary * 4
  }
}

export class PerformanceA implements ICalculate {
  public calculate(salary: number): number {
    return salary * 3
  }
}

export class PerformanceB implements ICalculate {
  public calculate(salary: number): number {
    return salary * 2
  }
}

export default class Bonus<T extends ICalculate> {
  private salary: number
  private performance: T

  public constructor(salary: number, performance: T) {
    this.salary = salary
    this.performance = performance
  }

  public getBonus(): number {
    return this.performance.calculate(this.salary)
  }
}
