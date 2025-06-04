import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

const SearchResultCard = ({ result, index, activeTab, onBook }) =&gt; {
  const iconMap = {
    flights: 'Plane',
    hotels: 'Building',
    cars: 'Car'
  };

  return (
    &lt;Card
      className="travel-card-hover"
      motionProps={{
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3, delay: index * 0.1 }
      }}
    &gt;
      &lt;div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"&gt;
        &lt;div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4"&gt;
          &lt;div className="flex items-center space-x-3"&gt;
            &lt;div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg"&gt;
              &lt;ApperIcon name={iconMap[activeTab] || 'Plane'} className="h-6 w-6 text-primary" /&gt;
            &lt;/div&gt;
            &lt;div&gt;
              &lt;h5 className="font-semibold text-gray-900"&gt;{result.provider}&lt;/h5&gt;
              &lt;p className="text-sm text-gray-600"&gt;{result.aircraft || result.type}&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          
          &lt;div className="text-center"&gt;
            &lt;div className="flex items-center justify-center space-x-2 mb-1"&gt;
              &lt;span className="font-medium"&gt;{result.departure}&lt;/span&gt;
              &lt;ApperIcon name="ArrowRight" className="h-4 w-4 text-gray-400" /&gt;
              &lt;span className="font-medium"&gt;{result.arrival}&lt;/span&gt;
            &lt;/div&gt;
            &lt;p className="text-sm text-gray-600"&gt;{result.duration} • {result.stops}&lt;/p&gt;
          &lt;/div&gt;
          
          &lt;div className="text-right lg:text-center"&gt;
            &lt;div className="text-2xl font-bold text-gray-900"&gt;${result.price}&lt;/div&gt;
            &lt;p className="text-sm text-gray-600"&gt;per person&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        
        &lt;div className="lg:ml-6"&gt;
          &lt;Button
            onClick={() =&gt; onBook(result)}
            className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          &gt;
            Book Now
          &lt;/Button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/Card&gt;
  );
};

export default SearchResultCard;