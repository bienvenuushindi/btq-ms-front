import React from 'react';
import {format} from "date-fns";

const DateDisplay = ({date}) => {
    if (!date) {
        return (
            <div className="p-2 rounded bg-gray-300">Not Applied</div>
        );
    }
    console.log(date)
    const currentDate = new Date().getTime();
    const expirationDate = new Date(date).getTime();

    const timeDiff = expirationDate - currentDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let colorVariant = 'bg-green-100 text-green-800';

    if (daysDiff <= 0) {
        colorVariant = 'bg-red-100 text-red-800';
    } else if (daysDiff <= 30) {
        colorVariant = 'bg-orange-100 text-orange-800';
    }


    return (
        <div className={`px-1 rounded text-md py-0.5 font-bold ${colorVariant}`}>
            {format(expirationDate, 'yyyy-MM-dd')}
        </div>
    );
};

export default DateDisplay;
