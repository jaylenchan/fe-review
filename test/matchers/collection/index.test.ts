describe('collection matchers', () => {
  test('toContain：shoppingList应该有milk', () => {
    const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'milk']

    expect(shoppingList).toContain('milk')
  })

  test('toContain：shoppingListSet应该有milk', () => {
    const shoppingListSet = new Set([
      'diapers',
      'kleenex',
      'trash bags',
      'paper towels',
      'milk'
    ])

    expect(shoppingListSet).toContain('milk')
  })
})
