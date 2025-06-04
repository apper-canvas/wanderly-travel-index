import React from 'react';
import ApperIcon from '../ApperIcon';
import SectionTitle from '../atoms/SectionTitle';
import ShimmerEffect from '../atoms/ShimmerEffect';
import ActivityItem from '../molecules/ActivityItem';

const RecentActivitySection = ({ recentTrips, loading }) =&gt; {
  return (
    &lt;section className="py-12 md:py-16"&gt;
      &lt;div className="container mx-auto px-4 sm:px-6 lg:px-8"&gt;
        &lt;div className="max-w-4xl mx-auto"&gt;
          &lt;SectionTitle title="Recent Activity" center /&gt;
          
          &lt;div className="space-y-4"&gt;
            {loading ? (
              Array(3).fill(0).map((_, i) =&gt; (
                &lt;div key={i} className="glass-effect rounded-xl p-6"&gt;
                  &lt;div className="flex items-center space-x-4"&gt;
                    &lt;ShimmerEffect className="h-12 w-12 rounded-full" /&gt;
                    &lt;div className="flex-1 space-y-2"&gt;
                      &lt;ShimmerEffect className="h-4 w-1/3" /&gt;
                      &lt;ShimmerEffect className="h-3 w-1/2" /&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
              ))
            ) : recentTrips.length &gt; 0 ? (
              recentTrips.map((trip, index) =&gt; (
                &lt;ActivityItem key={trip.tripId} trip={trip} index={index} /&gt;
              ))
            ) : (
              &lt;div className="text-center py-12"&gt;
                &lt;ApperIcon name="Calendar" className="h-16 w-16 text-gray-300 mx-auto mb-4" /&gt;
                &lt;p className="text-gray-500"&gt;No recent trips to show&lt;/p&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  );
};

export default RecentActivitySection;