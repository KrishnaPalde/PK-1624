import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import axios from 'axios';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        // const response = await axios.get('http://localhost:4444/api/unavailable_dates');
        const response = await axios.get('https://pk-1624.onrender.com/api/unavailable_dates');
        setUnavailableDates(response.data.unavailableDates.map(date => new Date(date)));
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailableDate =>
      date.toDateString() === unavailableDate.toDateString()
    );
  };

  const onDateClick = (date) => {
    if (!isDateUnavailable(date)) {
      setSelectedDate(date);
    }
  };

  const renderDays = () => {
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return dayNames.map(day => (
      <div key={day} className="text-sm font-semibold text-center text-gray-600">
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = monthStart.getDay();
    const days = [];

    for (let i = 0; i < 42; i++) {
      const day = new Date(monthStart);
      day.setDate(i - startDate + 1);
      const formattedDate = format(day, 'd');
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isSelected = isCurrentMonth && day.toDateString() === selectedDate.toDateString();
      const isUnavailable = isDateUnavailable(day);

      days.push(
        <div
          key={i}
          className={`text-center p-1 ${isCurrentMonth ? '' : 'text-gray-400'} 
          ${isSelected ? 'bg-blue-500 text-white rounded' : ''}
          ${isUnavailable ? 'bg-blue-200 text-blue-800' : ''}
          ${isToday(day) && !isSelected ? 'border border-blue-500' : ''}
          cursor-pointer hover:bg-gray-100`}
          onClick={() => onDateClick(day)}
        >
          {formattedDate}
        </div>
      );
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow">
      <h2 className="mb-2 text-lg font-semibold">Select date</h2>
      <div className="mb-4 text-2xl font-bold">{format(selectedDate, 'EEE, MMM d')}</div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
        <div>
          <button onClick={prevMonth} className="mr-2 text-gray-600">&lt;</button>
          <button onClick={nextMonth} className="text-gray-600">&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default CustomCalendar;