import expenseData from '../mockData/expenses.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let expenses = [...expenseData]

const expenseService = {
  async getAll() {
    await delay(300)
    return [...expenses]
  },

  async getById(id) {
    await delay(250)
    const expense = expenses.find(e => e.expenseId === id)
    return expense ? { ...expense } : null
  },

  async create(expense) {
    await delay(400)
    const newExpense = {
      ...expense,
      expenseId: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    expenses.push(newExpense)
    return { ...newExpense }
  },

  async update(id, data) {
    await delay(350)
    const index = expenses.findIndex(e => e.expenseId === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses[index] = { ...expenses[index], ...data, updatedAt: new Date().toISOString() }
    return { ...expenses[index] }
  },

  async delete(id) {
    await delay(300)
    const index = expenses.findIndex(e => e.expenseId === id)
    if (index === -1) throw new Error('Expense not found')
    
    const deletedExpense = expenses.splice(index, 1)[0]
    return { ...deletedExpense }
  }
}

export default expenseService