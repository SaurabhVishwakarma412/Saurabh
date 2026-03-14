import React from 'react';

const StatCard = ({ label, value, subValue }) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 text-center">
      <div className="text-3xl font-bold text-[#64ffda] mb-2">{value}</div>
      <div className="text-gray-300 font-medium mb-1">{label}</div>
      {subValue && <div className="text-gray-500 text-sm">{subValue}</div>}
    </div>
  );
};

export default StatCard;