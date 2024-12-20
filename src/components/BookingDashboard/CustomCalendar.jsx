import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
const process = import.meta.env;

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/unavailable_dates`);
        setUnavailableDates(response.data.unavailableDates);
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Determine the status of a given date
  const getDateStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd'); // Ensure consistent formatting
    const foundDate = unavailableDates.find((unavailableDate) => unavailableDate.date === dateStr);
    return foundDate ? foundDate.status : 'available';
  };

  const onDateClick = (date) => {
    const status = getDateStatus(date);
    if (status === 'available') {
      setSelectedDate(date);
    }
  };

  const renderDays = () => {
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return dayNames.map((day) => (
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
      const status = getDateStatus(day);

      // Assign colors based on booking status
      const statusClass =
        status === 'fullyBooked'
          ? 'bg-red-200 text-red-800 cursor-not-allowed'
          : status === 'partiallyBooked'
          ? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
          : '';

      days.push(
        <div
          key={i}
          className={`text-center p-1 ${isCurrentMonth ? '' : 'text-gray-400'} 
          ${isSelected ? 'bg-blue-500 text-white rounded' : ''}
          ${statusClass}
          ${isToday(day) && !isSelected ? 'border border-blue-500' : ''}
          cursor-pointer hover:bg-gray-100`}
          onClick={() => onDateClick(day)}
          title={
            status === 'fullyBooked'
              ? 'Date is fully booked'
              : status === 'partiallyBooked'
              ? 'Date is partially booked'
              : 'Select date'
          }
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
    <div className="p-4 bg-white rounded-lg shadow w-72 md:w-80 xl:w-[38rem]">
      <h2 className="mb-2 text-lg font-semibold">Select date</h2>
      <div className="mb-4 text-2xl font-bold">{format(selectedDate, 'EEE, MMM d')}</div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
        <div>
          <button onClick={prevMonth} className="mr-2 text-gray-600">
            <FaChevronLeft />
          </button>
          <button onClick={nextMonth} className="text-gray-600">
            <FaChevronRight />
          </button>
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
