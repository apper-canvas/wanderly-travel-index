import React from 'react';
import Logo from '../molecules/Logo';
import NavLink from '../molecules/NavLink';
import IconButton from '../molecules/IconButton';

const AppHeader = () => {
  return (
    <header className="glass-effect sticky top-0 z-40 border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#trips">Trips</NavLink>
            <NavLink href="#bookings">Bookings</NavLink>
            <NavLink href="/wallet">Wallet</NavLink>
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <IconButton icon="Search" />
            <IconButton icon="Bell" />
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;