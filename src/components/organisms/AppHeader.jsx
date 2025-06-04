import React from 'react';
import Logo from '../molecules/Logo';
import NavLink from '../molecules/NavLink';
import IconButton from '../molecules/IconButton';

const AppHeader = () =&gt; {
  return (
    &lt;header className="glass-effect sticky top-0 z-40 border-b border-white/20"&gt;
      &lt;div className="container mx-auto px-4 sm:px-6 lg:px-8"&gt;
        &lt;div className="flex items-center justify-between h-16 md:h-20"&gt;
          &lt;Logo /&gt;
          
          &lt;nav className="hidden md:flex items-center space-x-8"&gt;
            &lt;NavLink href="#dashboard"&gt;Dashboard&lt;/NavLink&gt;
            &lt;NavLink href="#trips"&gt;Trips&lt;/NavLink&gt;
            &lt;NavLink href="#bookings"&gt;Bookings&lt;/NavLink&gt;
          &lt;/nav&gt;
          
          &lt;div className="flex items-center space-x-2 md:space-x-4"&gt;
            &lt;IconButton icon="Search" /&gt;
            &lt;IconButton icon="Bell" /&gt;
            &lt;div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary to-secondary"&gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/header&gt;
  );
};

export default AppHeader;