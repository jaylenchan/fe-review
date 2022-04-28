/**
 * 需求：公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。其中
 * 绩效为S，年终奖为4倍工资
 * 绩效为A，年终奖为3倍工资
 * 绩效为B，年终奖为2倍工资
 * 每个人都必定有年终奖，绩效最低给B，使用策略模式编写一段代码计算每个员工拿到的奖金数额
 */
import Bonus, { PerformanceS, PerformanceA, PerformanceB } from './calculateBonus'

describe('test calculate bonus', () => {
  test('salary 10000, performance S', () => {
    const salary = 10000
    const performanceS = new PerformanceS()
    const bonus = new Bonus(salary, performanceS)

    expect(bonus.getBonus()).toBe(40000)
  })

  test('salary 10000, performance A', () => {
    const salary = 10000
    const performanceA = new PerformanceA()
    const bonus = new Bonus(salary, performanceA)

    expect(bonus.getBonus()).toBe(30000)
  })

  test('salary 10000, performance B', () => {
    const salary = 10000
    const performanceB = new PerformanceB()
    const bonus = new Bonus(salary, performanceB)

    expect(bonus.getBonus()).toBe(20000)
  })
})
