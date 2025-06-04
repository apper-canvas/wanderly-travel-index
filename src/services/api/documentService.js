import documentData from '../mockData/documents.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let documents = [...documentData]

const documentService = {
  async getAll() {
    await delay(300)
    return [...documents]
  },

  async getById(id) {
    await delay(250)
    const document = documents.find(d => d.documentId === id)
    return document ? { ...document } : null
  },

  async getByType(type) {
    await delay(300)
    return documents.filter(d => d.type === type).map(d => ({ ...d }))
  },

  async create(document) {
    await delay(800) // Longer delay to simulate file upload
    const newDocument = {
      ...document,
      documentId: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    documents.push(newDocument)
    return { ...newDocument }
  },

  async update(id, data) {
    await delay(400)
    const index = documents.findIndex(d => d.documentId === id)
    if (index === -1) throw new Error('Document not found')
    
    documents[index] = { 
      ...documents[index], 
      ...data, 
      updatedAt: new Date().toISOString() 
    }
    return { ...documents[index] }
  },

  async delete(id) {
    await delay(300)
    const index = documents.findIndex(d => d.documentId === id)
    if (index === -1) throw new Error('Document not found')
    
    const deletedDocument = documents.splice(index, 1)[0]
    return { ...deletedDocument }
  },

  async search(query) {
    await delay(400)
    const lowercaseQuery = query.toLowerCase()
    return documents.filter(d => 
      d.name.toLowerCase().includes(lowercaseQuery) ||
      d.type.toLowerCase().includes(lowercaseQuery) ||
      d.description?.toLowerCase().includes(lowercaseQuery) ||
      d.country?.toLowerCase().includes(lowercaseQuery) ||
      d.documentNumber?.toLowerCase().includes(lowercaseQuery)
    ).map(d => ({ ...d }))
  },

  async getExpiringDocuments(daysFromNow = 180) {
    await delay(300)
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + daysFromNow)
    
    return documents.filter(d => {
      if (!d.expiryDate) return false
      const expiryDate = new Date(d.expiryDate)
      return expiryDate <= futureDate && expiryDate > new Date()
    }).map(d => ({ ...d }))
  }
}

export default documentService