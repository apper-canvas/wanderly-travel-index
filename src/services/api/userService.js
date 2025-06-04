import userData from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...userData]

const userService = {
  async getAll() {
    await delay(300)
    return [...users]
  },

  async getById(id) {
    await delay(250)
    const user = users.find(u => u.userId === id)
    return user ? { ...user } : null
  },

  async create(user) {
    await delay(400)
    const newUser = {
      ...user,
      userId: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    return { ...newUser }
  },

  async update(id, data) {
    await delay(350)
    const index = users.findIndex(u => u.userId === id)
    if (index === -1) throw new Error('User not found')
    
    users[index] = { ...users[index], ...data, updatedAt: new Date().toISOString() }
    return { ...users[index] }
  },

  async delete(id) {
    await delay(300)
    const index = users.findIndex(u => u.userId === id)
    if (index === -1) throw new Error('User not found')
    
    const deletedUser = users.splice(index, 1)[0]
    return { ...deletedUser }
  }
}

export default userService