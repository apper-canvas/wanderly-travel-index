import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className, onClick, disabled, icon: Icon, ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center space-x-2 rounded-xl font-semibold transition-all duration-300 ${className}`}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {Icon &amp;&amp; &lt;Icon className="h-5 w-5" /&gt;}
      &lt;span&gt;{children}&lt;/span&gt;
    </motion.button>
  );
};

export default Button;