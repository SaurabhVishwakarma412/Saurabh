import React from 'react';

const SectionHeading = ({ number, title }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[#64ffda] font-mono text-xl">{number}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-200">{title}</h2>
      <div className="flex-1 h-px bg-gray-700 ml-4"></div>
    </div>
  );
};

export default SectionHeading;