import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { bookingService, tripService } from '../services'

const MainFeature = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('flights')
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  })
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true)
      try {
        const result = await bookingService.getAll()
        setBookings(result || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [])

  const handleInputChange = (field, value) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = async () => {
    if (!searchForm.from || !searchForm.to || !searchForm.departDate) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSearching(true)
    try {
      // Simulate search with delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate mock search results based on form data
      const mockResults = [
        {
          id: 1,
          provider: 'AirExpress',
          price: 299,
          duration: '3h 45m',
          departure: '08:30',
          arrival: '12:15',
          stops: 'Non-stop',
          aircraft: 'Boeing 737'
        },
        {
          id: 2,
          provider: 'SkyLine',
          price: 259,
          duration: '5h 20m',
          departure: '14:15',
          arrival: '19:35',
          stops: '1 stop',
          aircraft: 'Airbus A320'
        },
        {
          id: 3,
          provider: 'CloudWings',
          price: 349,
          duration: '3h 30m',
          departure: '18:45',
          arrival: '22:15',
          stops: 'Non-stop',
          aircraft: 'Boeing 787'
        }
      ]
      
      setSearchResults(mockResults)
      toast.success(`Found ${mockResults.length} ${activeTab} options!`)
    } catch (err) {
      toast.error("Search failed. Please try again.")
      setError(err.message)
    } finally {
      setIsSearching(false)
    }
  }

  const handleBooking = async (result) => {
    try {
      const newBooking = {
        type: activeTab,
        provider: result.provider,
        details: {
          from: searchForm.from,
          to: searchForm.to,
          date: searchForm.departDate,
          ...result
        },
        price: result.price,
        currency: 'USD',
        confirmationNumber: `WN${Date.now()}`,
        status: 'confirmed'
      }

      const savedBooking = await bookingService.create(newBooking)
      setBookings(prev => [...prev, savedBooking])
      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} booked successfully!`)
      
      // Reset search results
      setSearchResults([])
    } catch (err) {
      toast.error("Booking failed. Please try again.")
    }
  }

  const tabs = [
    { id: 'flights', label: 'Flights', icon: 'Plane', color: 'blue' },
    { id: 'hotels', label: 'Hotels', icon: 'Building', color: 'emerald' },
    { id: 'cars', label: 'Cars', icon: 'Car', color: 'amber' }
  ]

  const getTabColors = (tabId, isActive) => {
    const colors = {
      flights: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      hotels: isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      cars: isActive ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
    }
    return colors[tabId] || colors.flights
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Smart Travel Booking
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Search and compare thousands of options across flights, hotels, and transportation. 
          Get the best deals with our intelligent booking system.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-2 sm:space-y-0 sm:space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setSearchResults([])
            }}
            className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${getTabColors(tab.id, activeTab === tab.id)}`}
          >
            <ApperIcon name={tab.icon} className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-effect rounded-2xl p-6 md:p-8 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* From */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {activeTab === 'flights' ? 'From' : activeTab === 'hotels' ? 'Destination' : 'Pickup Location'}
            </label>
            <div className="relative">
              <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'flights' ? 'Departure city' : activeTab === 'hotels' ? 'City or hotel name' : 'Pickup address'}
                value={searchForm.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* To */}
          {activeTab !== 'hotels' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {activeTab === 'flights' ? 'To' : 'Drop-off Location'}
              </label>
              <div className="relative">
                <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={activeTab === 'flights' ? 'Destination city' : 'Drop-off address'}
                  value={searchForm.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {activeTab === 'flights' ? 'Departure' : activeTab === 'hotels' ? 'Check-in' : 'Pickup Date'}
            </label>
            <div className="relative">
              <ApperIcon name="Calendar" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={searchForm.departDate}
                onChange={(e) => handleInputChange('departDate', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Passengers/Guests/Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {activeTab === 'flights' ? 'Passengers' : activeTab === 'hotels' ? 'Guests' : 'Duration'}
            </label>
            <div className="relative">
              <ApperIcon name="Users" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={searchForm.passengers}
                onChange={(e) => handleInputChange('passengers', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
              >
                {activeTab === 'cars' ? (
                  <>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="7">1 week</option>
                  </>
                ) : (
                  <>
                    <option value="1">1 {activeTab === 'flights' ? 'Passenger' : 'Guest'}</option>
                    <option value="2">2 {activeTab === 'flights' ? 'Passengers' : 'Guests'}</option>
                    <option value="3">3 {activeTab === 'flights' ? 'Passengers' : 'Guests'}</option>
                    <option value="4">4+ {activeTab === 'flights' ? 'Passengers' : 'Guests'}</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-travel hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ApperIcon name="Loader" className="h-5 w-5" />
                </motion.div>
              ) : (
                <ApperIcon name="Search" className="h-5 w-5" />
              )}
              <span>{isSearching ? 'Searching...' : `Search ${tabs.find(t => t.id === activeTab)?.label}`}</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Search Results */}
      <AnimatePresence mode="wait">
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Found {searchResults.length} options for your trip
            </h4>
            
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 travel-card-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg">
                        <ApperIcon name={tabs.find(t => t.id === activeTab)?.icon || 'Plane'} className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{result.provider}</h5>
                        <p className="text-sm text-gray-600">{result.aircraft || result.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <span className="font-medium">{result.departure}</span>
                        <ApperIcon name="ArrowRight" className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{result.arrival}</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.duration} • {result.stops}</p>
                    </div>
                    
                    <div className="text-right lg:text-center">
                      <div className="text-2xl font-bold text-gray-900">${result.price}</div>
                      <p className="text-sm text-gray-600">per person</p>
                    </div>
                  </div>
                  
                  <div className="lg:ml-6">
                    <button
                      onClick={() => handleBooking(result)}
                      className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Bookings */}
      {bookings && bookings.length > 0 && (
        <div className="mt-12">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.slice(0, 3).map((booking, index) => (
              <motion.div
                key={booking.bookingId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-4 travel-card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name={booking.type === 'flights' ? 'Plane' : booking.type === 'hotels' ? 'Building' : 'Car'} className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">{booking.provider}</span>
                  </div>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {booking.details?.from && booking.details?.to 
                    ? `${booking.details.from} → ${booking.details.to}`
                    : booking.details?.destination || 'Booking details'
                  }
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">${booking.price}</span>
                  <span className="text-xs text-gray-500">#{booking.confirmationNumber}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MainFeature