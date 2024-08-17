import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingFormContext = createContext();

const BookingProvider = ({ children }) => {
  const today = new Date();
  today.setDate(today.getDate()-1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getStoredBookingInfo = () => {
    const storedBooking = localStorage.getItem('bookingInfo');
    if (storedBooking) {
      const parsedBooking = JSON.parse(storedBooking);
      return {
        ...parsedBooking,
        checkIn: new Date(parsedBooking.checkIn), 
        checkOut: new Date(parsedBooking.checkOut), 
      };
    }
    return {
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 2,
    };
  };
  

  const [bookingInfo, setBookingInfo] = useState(getStoredBookingInfo);

  useEffect(() => {
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
  }, [bookingInfo]);

  return (
    <BookingFormContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingFormContext.Provider>
  );
};

export default BookingProvider;

export const useBooking = () => useContext(BookingFormContext);
