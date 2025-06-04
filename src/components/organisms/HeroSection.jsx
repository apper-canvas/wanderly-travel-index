import React from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

const HeroSection = () =&gt; {
  return (
    &lt;section className="relative overflow-hidden py-12 md:py-20"&gt;
      &lt;div className="absolute inset-0 bg-mesh opacity-60"&gt;&lt;/div&gt;
      &lt;div className="container mx-auto px-4 sm:px-6 lg:px-8 relative"&gt;
        &lt;div className="text-center max-w-4xl mx-auto"&gt;
          &lt;motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          &gt;
            Your Journey Starts with{' '}
            &lt;span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"&gt;
              Perfect Planning
            &lt;/span&gt;
          &lt;/motion.h2&gt;
          
          &lt;motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          &gt;
            Book flights, hotels, and transportation. Create detailed itineraries. 
            Manage expenses. All in one intelligent platform designed for modern travelers.
          &lt;/motion.p&gt;
          
          &lt;motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          &gt;
            &lt;Button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white shadow-travel hover:shadow-xl transform hover:-translate-y-1"&gt;
              Start Planning
            &lt;/Button&gt;
            &lt;Button className="w-full sm:w-auto px-8 py-4 glass-effect text-gray-700 hover:bg-white/90"&gt;
              Explore Features
            &lt;/Button&gt;
          &lt;/motion.div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  );
};

export default HeroSection;