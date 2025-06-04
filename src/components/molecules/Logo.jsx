import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const Logo = () =&gt; {
  return (
    &lt;motion.div 
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    &gt;
      &lt;div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-xl"&gt;
        &lt;ApperIcon name="Plane" className="h-6 w-6 md:h-8 md:w-8 text-white" /&gt;
      &lt;/div&gt;
      &lt;h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"&gt;
        Wanderly
      &lt;/h1&gt;
    &lt;/motion.div&gt;
  );
};

export default Logo;