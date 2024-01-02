import React from 'react';

const StatsCard = ({ label, data, cardColor, textColor }) => {

  return (
    <div className={`shadow-md rounded-md p-4 mb-4 ${cardColor}`}>
      <div className={`text-lg font-semibold mb-2 ${textColor}`}>{label}</div>
      <div className={`text-4xl font-bold ${textColor}`}>{data}</div>
    </div>
  );
};


export default StatsCard;