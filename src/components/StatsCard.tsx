import React from 'react';

const StatsCard = ({ label, data, cardColor, textColor }) => {

  return (
    <div className={`shadow-md rounded-md p-2 mb-3 w-28 ${cardColor}`}>
      <div className={`text-md  mb-1 text-gray-500`}>{label}</div>
      <div className={`text-3xl font-bold ${textColor}`}>{data}</div>
    </div>
  );
};


export default StatsCard;