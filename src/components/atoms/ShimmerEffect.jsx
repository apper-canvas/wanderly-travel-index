import React from 'react';

const ShimmerEffect = ({ className = '' }) =&gt; {
  return &lt;div className={`bg-gray-200 rounded shimmer ${className}`} /&gt;;
};

export default ShimmerEffect;