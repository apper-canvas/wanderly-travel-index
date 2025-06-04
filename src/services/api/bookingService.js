import bookingData from '../mockData/bookings.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let bookings = [...bookingData]

const bookingService = {
  async getAll() {
    await delay(300)
    return [...bookings]
  },

  async getById(id) {
    await delay(250)
    const booking = bookings.find(b => b.bookingId === id)
    return booking ? { ...booking } : null
  },

  async create(booking) {
    await delay(400)
    const newBooking = {
      ...booking,
      bookingId: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    bookings.push(newBooking)
    return { ...newBooking }
  },

  async update(id, data) {
    await delay(350)
    const index = bookings.findIndex(b => b.bookingId === id)
    if (index === -1) throw new Error('Booking not found')
    
    bookings[index] = { ...bookings[index], ...data, updatedAt: new Date().toISOString() }
    return { ...bookings[index] }
  },

  async delete(id) {
    await delay(300)
    const index = bookings.findIndex(b => b.bookingId === id)
    if (index === -1) throw new Error('Booking not found')
    
    const deletedBooking = bookings.splice(index, 1)[0]
    return { ...deletedBooking }
  }
}

export default bookingService