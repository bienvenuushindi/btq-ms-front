import React from 'react';

type StatsCardProps = {
  label: React.ReactNode;
  data: React.ReactNode;
  cardColor: string;
  textColor: string;
  children?: React.ReactNode;
};

const StatsCard = ({ label, data, cardColor, textColor, children }: StatsCardProps) => {

  return (
    <div className={`flex min-h-28 min-w-0 max-w-full flex-col justify-between rounded-2xl border border-slate-200/90 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.04)] sm:h-32 sm:rounded-[20px] sm:p-4 ${cardColor}`}>
      <div className="text-[11px] font-semibold leading-snug text-slate-600 sm:text-xs">{label}</div>
      <div>
        <div className={`font-display text-2xl font-bold leading-none sm:text-4xl ${textColor}`}>{data}</div>
        {children && <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">{children}</div>}
      </div>
    </div>
  );
};


export default StatsCard;
