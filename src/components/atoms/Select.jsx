import React from 'react';
import ApperIcon from '../ApperIcon'; // Assuming ApperIcon path is correct

const Select = ({ label, value, onChange, options, icon, ...props }) => {
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
        &lt;select
          value={value}
          onChange={onChange}
          className={`w-full pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white ${icon ? 'pl-10' : 'pl-4'}`}
          {...props}
        &gt;
          {options.map((option) =&gt; (
            &lt;option key={option.value} value={option.value}&gt;
              {option.label}
            &lt;/option&gt;
          ))}
        &lt;/select&gt;
        &lt;ApperIcon name="ChevronDown" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default Select;