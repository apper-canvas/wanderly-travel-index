import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon path is correct

const Input = ({ label, type = 'text', placeholder, value, onChange, icon, ...props }) => {
  return (
    &lt;div className="space-y-2"&gt;
      {label &amp;&amp; (
        &lt;label className="block text-sm font-medium text-gray-700"&gt;
          {label}
        &lt;/label&gt;
      )}
      &lt;div className="relative"&gt;
        {icon &amp;&amp; (
          &lt;ApperIcon name={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /&gt;
        )}
        &lt;input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${icon ? 'pl-10' : 'pl-4'}`}
          {...props}
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default Input;