import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingFormContext = createContext();

const BookingProvider = ({ children }) => {
  const getInitialBookingInfo = () => {
    const storedBooking = localStorage.getItem('bookingInfo');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (storedBooking) {
      const parsedBooking = JSON.parse(storedBooking);
      return {
        checkIn: new Date(parsedBooking.checkIn) < today ? today : new Date(parsedBooking.checkIn),
        checkOut: new Date(parsedBooking.checkOut) <= today ? tomorrow : new Date(parsedBooking.checkOut),
        adults: parsedBooking.adults || 2,
        children: parsedBooking.children || 2,
      };
    }

    return {
      checkIn: today,
      checkOut: tomorrow,
      adults: 2,
      children: 2,
    };
  };

  const [bookingInfo, setBookingInfo] = useState(getInitialBookingInfo);

  useEffect(() => {
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
  }, [bookingInfo]);

  const updateBookingInfo = (newInfo) => {
    setBookingInfo(prevInfo => ({
      ...prevInfo,
      ...newInfo,
      checkIn: new Date(newInfo.checkIn),
      checkOut: new Date(newInfo.checkOut),
    }));
  };

  return (
    <BookingFormContext.Provider value={{ bookingInfo, updateBookingInfo }}>
      {children}
    </BookingFormContext.Provider>
  );
};

export default BookingProvider;

export const useBooking = () => useContext(BookingFormContext);