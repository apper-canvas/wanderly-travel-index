import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { tripService } from '../services'

const Home = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const result = await tripService.getAll()
        setTrips(result)
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load trips")
      } finally {
        setLoading(false)
      }
    }
    loadTrips()
  }, [])

  const upcomingTrips = trips?.filter(trip => new Date(trip.startDate) > new Date()) || []
  const recentTrips = trips?.filter(trip => new Date(trip.startDate) <= new Date()).slice(0, 3) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-40 border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-xl">
                <ApperIcon name="Plane" className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Wanderly
              </h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</a>
              <a href="#trips" className="text-gray-700 hover:text-primary transition-colors">Trips</a>
              <a href="#bookings" className="text-gray-700 hover:text-primary transition-colors">Bookings</a>
            </nav>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
                <ApperIcon name="Search" className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
                <ApperIcon name="Bell" className="h-5 w-5 text-gray-600" />
              </button>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 bg-mesh opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Your Journey Starts with{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Perfect Planning
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Book flights, hotels, and transportation. Create detailed itineraries. 
              Manage expenses. All in one intelligent platform designed for modern travelers.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-travel hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Start Planning
              </button>
              <button className="w-full sm:w-auto px-8 py-4 glass-effect text-gray-700 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300">
                Explore Features
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="py-12 md:py-16" id="dashboard">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Travel Dashboard</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a complete overview of your travel plans, upcoming trips, and recent activity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Upcoming Trips Card */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 travel-card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Upcoming Trips</h4>
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                  <ApperIcon name="Calendar" className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                </div>
              ) : upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.slice(0, 2).map((trip) => (
                    <div key={trip.tripId} className="border-l-4 border-primary pl-4">
                      <h5 className="font-medium text-gray-900">{trip.name}</h5>
                      <p className="text-sm text-gray-600">{new Date(trip.startDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No upcoming trips planned</p>
              )}
              
              <button className="w-full mt-4 py-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors">
                View All Trips →
              </button>
            </motion.div>

            {/* Quick Booking Card */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 travel-card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Quick Booking</h4>
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg">
                  <ApperIcon name="Zap" className="h-5 w-5 text-secondary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group">
                  <ApperIcon name="Plane" className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-700">Flights</span>
                </button>
                <button className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:from-emerald-100 hover:to-emerald-200 transition-all group">
                  <ApperIcon name="Building" className="h-5 w-5 text-secondary mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-700">Hotels</span>
                </button>
                <button className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all group">
                  <ApperIcon name="Car" className="h-5 w-5 text-accent mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-700">Cars</span>
                </button>
                <button className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all group">
                  <ApperIcon name="MapPin" className="h-5 w-5 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-700">Activities</span>
                </button>
              </div>
            </motion.div>

            {/* Expense Summary Card */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 travel-card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Travel Expenses</h4>
                <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
                  <ApperIcon name="DollarSign" className="h-5 w-5 text-accent" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold text-gray-900">$2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Budget Left</span>
                  <span className="font-semibold text-secondary">$1,550</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full" style={{ width: '61%' }}></div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 text-accent hover:text-amber-600 font-medium text-sm transition-colors">
                View Details →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Recent Activity</h3>
            
            <div className="space-y-4">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="glass-effect rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-full shimmer"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded shimmer w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : recentTrips.length > 0 ? (
                recentTrips.map((trip, index) => (
                  <motion.div 
                    key={trip.tripId}
                    className="glass-effect rounded-xl p-6 travel-card-hover"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <ApperIcon name="MapPin" className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{trip.name}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trip.status === 'completed' 
                          ? 'bg-secondary/10 text-secondary' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <ApperIcon name="Calendar" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent trips to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-xl">
                  <ApperIcon name="Plane" className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold">Wanderly</h1>
              </div>
              <p className="text-gray-400 max-w-md">
                The complete travel management platform for modern explorers. 
                Plan, book, and manage every aspect of your journey.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Flight Booking</li>
                <li>Hotel Reservations</li>
                <li>Itinerary Planning</li>
                <li>Expense Tracking</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wanderly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home