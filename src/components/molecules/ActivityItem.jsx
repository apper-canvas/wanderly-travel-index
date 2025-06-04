import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';

const ActivityItem = ({ trip, index }) =&gt; {
  const statusClass = trip.status === 'completed' 
    ? 'bg-secondary/10 text-secondary' 
    : 'bg-primary/10 text-primary';

  return (
    &lt;Card
      className="travel-card-hover"
      motionProps={{
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay: index * 0.1 }
      }}
    &gt;
      &lt;div className="flex items-center justify-between"&gt;
        &lt;div className="flex items-center space-x-4"&gt;
          &lt;div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"&gt;
            &lt;ApperIcon name="MapPin" className="h-6 w-6 text-white" /&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;h4 className="font-semibold text-gray-900"&gt;{trip.name}&lt;/h4&gt;
            &lt;p className="text-sm text-gray-600"&gt;
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            &lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}&gt;
          {trip.status}
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/Card&gt;
  );
};

export default ActivityItem;