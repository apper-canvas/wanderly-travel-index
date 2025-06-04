import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';

const RecentBookingCard = ({ booking, index }) =&gt; {
  const iconMap = {
    flights: 'Plane',
    hotels: 'Building',
    cars: 'Car'
  };

  return (
    &lt;Card
      className="p-4 travel-card-hover"
      motionProps={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: index * 0.1 }
      }}
    &gt;
      &lt;div className="flex items-center justify-between mb-3"&gt;
        &lt;div className="flex items-center space-x-2"&gt;
          &lt;ApperIcon name={iconMap[booking.type] || 'Plane'} className="h-5 w-5 text-primary" /&gt;
          &lt;span className="font-medium text-gray-900"&gt;{booking.provider}&lt;/span&gt;
        &lt;/div&gt;
        &lt;span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium"&gt;
          {booking.status}
        &lt;/span&gt;
      &lt;/div&gt;
      &lt;p className="text-sm text-gray-600 mb-2"&gt;
        {booking.details?.from &amp;&amp; booking.details?.to 
          ? `${booking.details.from} → ${booking.details.to}`
          : booking.details?.destination || 'Booking details'
        }
      &lt;/p&gt;
      &lt;div className="flex justify-between items-center"&gt;
        &lt;span className="text-lg font-bold text-gray-900"&gt;${booking.price}&lt;/span&gt;
        &lt;span className="text-xs text-gray-500"&gt;#{booking.confirmationNumber}&lt;/span&gt;
      &lt;/div&gt;
    &lt;/Card&gt;
  );
};

export default RecentBookingCard;