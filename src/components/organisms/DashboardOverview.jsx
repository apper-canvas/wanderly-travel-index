import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import SectionTitle from '../atoms/SectionTitle';
import FeatureCard from '../molecules/FeatureCard';

const DashboardOverview = ({ upcomingTrips, loading }) =&gt; {
  return (
    &lt;section className="py-12 md:py-16" id="dashboard"&gt;
      &lt;div className="container mx-auto px-4 sm:px-6 lg:px-8"&gt;
        &lt;SectionTitle 
          title="Your Travel Dashboard" 
          description="Get a complete overview of your travel plans, upcoming trips, and recent activity" 
          center 
        /&gt;

        &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"&gt;
          {/* Upcoming Trips Card */}
          &lt;FeatureCard
            title="Upcoming Trips"
            icon="Calendar"
            iconBgColor="from-blue-100 to-blue-200"
            buttonText="View All Trips"
            buttonColorClass="text-primary hover:text-primary-dark"
            loading={loading}
            isEmpty={upcomingTrips.length === 0}
            motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } }}
          &gt;
            {upcomingTrips.slice(0, 2).map((trip) =&gt; (
              &lt;div key={trip.tripId} className="border-l-4 border-primary pl-4"&gt;
                &lt;h5 className="font-medium text-gray-900"&gt;{trip.name}&lt;/h5&gt;
                &lt;p className="text-sm text-gray-600"&gt;{new Date(trip.startDate).toLocaleDateString()}&lt;/p&gt;
              &lt;/div&gt;
            ))}
          &lt;/FeatureCard&gt;

          {/* Quick Booking Card */}
          &lt;FeatureCard
            title="Quick Booking"
            icon="Zap"
            iconBgColor="from-emerald-100 to-emerald-200"
            motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } }}
          &gt;
            &lt;div className="grid grid-cols-2 gap-3"&gt;
              &lt;button className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group"&gt;
                &lt;ApperIcon name="Plane" className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" /&gt;
                &lt;span className="text-xs font-medium text-gray-700"&gt;Flights&lt;/span&gt;
              &lt;/button&gt;
              &lt;button className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:from-emerald-100 hover:to-emerald-200 transition-all group"&gt;
                &lt;ApperIcon name="Building" className="h-5 w-5 text-secondary mx-auto mb-1 group-hover:scale-110 transition-transform" /&gt;
                &lt;span className="text-xs font-medium text-gray-700"&gt;Hotels&lt;/span&gt;
              &lt;/button&gt;
              &lt;button className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all group"&gt;
                &lt;ApperIcon name="Car" className="h-5 w-5 text-accent mx-auto mb-1 group-hover:scale-110 transition-transform" /&gt;
                &lt;span className="text-xs font-medium text-gray-700"&gt;Cars&lt;/span&gt;
              &lt;/button&gt;
              &lt;button className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all group"&gt;
                &lt;ApperIcon name="MapPin" className="h-5 w-5 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" /&gt;
                &lt;span className="text-xs font-medium text-gray-700"&gt;Activities&lt;/span&gt;
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/FeatureCard&gt;

          {/* Expense Summary Card */}
          &lt;FeatureCard
            title="Travel Expenses"
            icon="DollarSign"
            iconBgColor="from-amber-100 to-amber-200"
            buttonText="View Details"
            buttonColorClass="text-accent hover:text-amber-600"
            motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } }}
          &gt;
            &lt;div className="space-y-3"&gt;
              &lt;div className="flex justify-between items-center"&gt;
                &lt;span className="text-sm text-gray-600"&gt;This Month&lt;/span&gt;
                &lt;span className="font-semibold text-gray-900"&gt;$2,450&lt;/span&gt;
              &lt;/div&gt;
              &lt;div className="flex justify-between items-center"&gt;
                &lt;span className="text-sm text-gray-600"&gt;Budget Left&lt;/span&gt;
                &lt;span className="font-semibold text-secondary"&gt;$1,550&lt;/span&gt;
              &lt;/div&gt;
              &lt;div className="w-full bg-gray-200 rounded-full h-2"&gt;
                &lt;div className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full" style={{ width: '61%' }}&gt;&lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/FeatureCard&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  );
};

export default DashboardOverview;