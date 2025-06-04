import React from 'react';

const NavLink = ({ href, children }) =&gt; {
  return (
    &lt;a href={href} className="text-gray-700 hover:text-primary transition-colors"&gt;
      {children}
    &lt;/a&gt;
  );
};

export default NavLink;