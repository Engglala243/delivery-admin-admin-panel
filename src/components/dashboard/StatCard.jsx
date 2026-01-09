import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
      <div className="flex items-center">
        <div className="bg-black rounded-lg p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-black">{value || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;