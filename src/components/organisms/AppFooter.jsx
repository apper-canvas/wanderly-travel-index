import React from 'react';
import ApperIcon from '../ApperIcon';
import Logo from '../molecules/Logo'; // Reusing the Logo molecule

const AppFooter = () =&gt; {
  return (
    &lt;footer className="bg-gray-900 text-white py-12"&gt;
      &lt;div className="container mx-auto px-4 sm:px-6 lg:px-8"&gt;
        &lt;div className="grid grid-cols-1 md:grid-cols-4 gap-8"&gt;
          &lt;div className="col-span-1 md:col-span-2"&gt;
            {/* Reusing Logo component, adjusted for footer context if needed */}
            &lt;div className="flex items-center space-x-3 mb-4"&gt;
              &lt;div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-xl"&gt;
                &lt;ApperIcon name="Plane" className="h-6 w-6 text-white" /&gt;
              &lt;/div&gt;
              &lt;h1 className="text-xl font-bold"&gt;Wanderly&lt;/h1&gt;
            &lt;/div&gt;
            &lt;p className="text-gray-400 max-w-md"&gt;
              The complete travel management platform for modern explorers. 
              Plan, book, and manage every aspect of your journey.
            &lt;/p&gt;
          &lt;/div&gt;
          
          &lt;div&gt;
            &lt;h5 className="font-semibold mb-4"&gt;Features&lt;/h5&gt;
            &lt;ul className="space-y-2 text-gray-400"&gt;
              &lt;li&gt;Flight Booking&lt;/li&gt;
              &lt;li&gt;Hotel Reservations&lt;/li&gt;
              &lt;li&gt;Itinerary Planning&lt;/li&gt;
              &lt;li&gt;Expense Tracking&lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;
          
          &lt;div&gt;
            &lt;h5 className="font-semibold mb-4"&gt;Support&lt;/h5&gt;
            &lt;ul className="space-y-2 text-gray-400"&gt;
              &lt;li&gt;Help Center&lt;/li&gt;
              &lt;li&gt;Contact Us&lt;/li&gt;
              &lt;li&gt;Privacy Policy&lt;/li&gt;
              &lt;li&gt;Terms of Service&lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        
        &lt;div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"&gt;
          &lt;p&gt;&copy; 2024 Wanderly. All rights reserved.&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/footer&gt;
  );
};

export default AppFooter;