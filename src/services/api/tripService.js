import tripData from '../mockData/trips.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let trips = [...tripData]

const tripService = {
  async getAll() {
    await delay(300)
    return [...trips]
  },

  async getById(id) {
    await delay(250)
    const trip = trips.find(t => t.tripId === id)
    return trip ? { ...trip } : null
  },

  async create(trip) {
    await delay(400)
    const newTrip = {
      ...trip,
      tripId: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    trips.push(newTrip)
    return { ...newTrip }
  },

  async update(id, data) {
    await delay(350)
    const index = trips.findIndex(t => t.tripId === id)
    if (index === -1) throw new Error('Trip not found')
    
    trips[index] = { ...trips[index], ...data, updatedAt: new Date().toISOString() }
    return { ...trips[index] }
  },

  async delete(id) {
    await delay(300)
    const index = trips.findIndex(t => t.tripId === id)
    if (index === -1) throw new Error('Trip not found')
    
    const deletedTrip = trips.splice(index, 1)[0]
    return { ...deletedTrip }
  }
}

export default tripService