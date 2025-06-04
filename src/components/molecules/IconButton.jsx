import React from 'react';
import ApperIcon from '../ApperIcon';

const IconButton = ({ icon, onClick, className = '' }) =&gt; {
  return (
    &lt;button className={`p-2 rounded-lg hover:bg-white/50 transition-colors ${className}`} onClick={onClick}&gt;
      &lt;ApperIcon name={icon} className="h-5 w-5 text-gray-600" /&gt;
    &lt;/button&gt;
  );
};

export default IconButton;