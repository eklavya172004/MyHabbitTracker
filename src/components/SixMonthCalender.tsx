'use client';

import React from 'react';

const SixMonthCalendar = () => {
    // Get today's date and normalize it to midnight to avoid time-related issues
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate an array of date objects for the next 6 months
    const months: Date[] = Array.from({ length: 6 }, (_, i) => {
        return new Date(today.getFullYear(), today.getMonth() + i, 1);
    });

    const renderMonth = (date:Date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' });

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Add blank cells for the days before the first of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`blank-${month}-${i}`} className="w-full aspect-square"></div>);
        }

        // Add the actual day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            let dayClass = 'flex items-center justify-center w-full aspect-square text-sm';
            
            if (currentDate < today) {
                // Style for past dates (the "cut sign")
                dayClass += ' text-gray-400 dark:text-gray-600 line-through opacity-70';
            } else if (currentDate.getTime() === today.getTime()) {
                // Style for the current day
                dayClass += ' bg-indigo-600 text-white rounded-full font-bold shadow-lg';
            } else {
                // Style for future dates
                dayClass += ' text-gray-700 dark:text-gray-300';
            }

            days.push(
                <div key={`${month}-${day}`} className={dayClass}>
                    {day}
                </div>
            );
        }

        return (
            <div key={`${year}-${month}`} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-center mb-3 text-gray-800 dark:text-gray-200">{`${monthName} ${year}`}</h3>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl mb-8">
             <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 tracking-wide">
                    Target: ₹1 Lakh / Month Internship
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your 6-Month Countdown Starts Now. Make every day count.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {months.map(monthDate => renderMonth(monthDate))}
            </div>
        </section>
    );
};

export default SixMonthCalendar;