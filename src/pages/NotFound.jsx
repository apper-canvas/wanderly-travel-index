import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <ApperIcon name="MapPin" className="h-24 w-24 text-primary mx-auto mb-4" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <ApperIcon name="Compass" className="h-8 w-8 text-accent" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            Destination Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like this travel route doesn't exist. Let's get you back on track!
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-travel hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <ApperIcon name="Home" className="h-5 w-5" />
            <span>Return Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          <div className="glass-effect rounded-xl p-4 text-center">
            <ApperIcon name="Plane" className="h-6 w-6 text-primary mx-auto mb-2" />
            <span className="text-xs text-gray-600">Flights</span>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <ApperIcon name="Building" className="h-6 w-6 text-secondary mx-auto mb-2" />
            <span className="text-xs text-gray-600">Hotels</span>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <ApperIcon name="Car" className="h-6 w-6 text-accent mx-auto mb-2" />
            <span className="text-xs text-gray-600">Cars</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound