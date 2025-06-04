import React from 'react';

const SectionTitle = ({ title, description, center = false }) =&gt; {
  return (
    &lt;div className={`${center ? 'text-center' : ''} mb-8 md:mb-12`}&gt;
      &lt;h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"&gt;
        {title}
      &lt;/h3&gt;
      {description &amp;&amp; (
        &lt;p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"&gt;
          {description}
        &lt;/p&gt;
      )}
    &lt;/div&gt;
  );
};

export default SectionTitle;