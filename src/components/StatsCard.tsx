import React from 'react';

const StatsCard = ({ label, data, cardColor, textColor }) => {

  return (
    <div className={`min-w-[180px] flex-1 rounded-[24px] border border-slate-200/90 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ${cardColor}`}>
      <div className="mb-3 text-sm font-semibold text-slate-600">{label}</div>
      <div className={`font-display text-5xl font-bold ${textColor}`}>{data}</div>
    </div>
  );
};


export default StatsCard;
