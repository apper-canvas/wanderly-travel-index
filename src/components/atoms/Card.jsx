import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', motionProps = {}, ...props }) =&gt; {
  return (
    &lt;motion.div
      className={`glass-effect rounded-2xl p-6 ${className}`}
      {...motionProps}
      {...props}
    &gt;
      {children}
    &lt;/motion.div&gt;
  );
};

export default Card;