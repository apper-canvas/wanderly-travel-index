import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import ShimmerEffect from '../atoms/ShimmerEffect';

const FeatureCard = ({ title, icon, iconBgColor, children, buttonText, buttonColorClass, onViewAll, loading, isEmpty, motionProps }) =&gt; {
  return (
    &lt;Card className="travel-card-hover" motionProps={motionProps}&gt;
      &lt;div className="flex items-center justify-between mb-4"&gt;
        &lt;h4 className="text-lg font-semibold text-gray-900"&gt;{title}&lt;/h4&gt;
        &lt;div className={`p-2 rounded-lg ${iconBgColor}`}&gt;
          &lt;ApperIcon name={icon} className="h-5 w-5 text-primary" /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      
      {loading ? (
        &lt;div className="space-y-3"&gt;
          &lt;ShimmerEffect className="h-4" /&gt;
          &lt;ShimmerEffect className="h-4 w-3/4" /&gt;
        &lt;/div&gt;
      ) : isEmpty ? (
        &lt;p className="text-gray-500 text-sm"&gt;No {title.toLowerCase()} planned&lt;/p&gt;
      ) : (
        children
      )}
      
      {buttonText &amp;&amp; (
        &lt;Button 
          onClick={onViewAll} 
          className={`w-full mt-4 py-2 ${buttonColorClass} font-medium text-sm`}
        &gt;
          {buttonText} →
        &lt;/Button&gt;
      )}
    &lt;/Card&gt;
  );
};

export default FeatureCard;