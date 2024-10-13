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
        children: parsedBooking.children || 0,
        rooms: parsedBooking.rooms || 1, 
      };
    }

    return {
      checkIn: today,
      checkOut: tomorrow,
      adults: 2,
      children: 0,
      rooms: 1, 
    };
  };

  const [bookingInfo, setBookingInfo] = useState(getInitialBookingInfo);

  useEffect(() => {
    localStorage.setItem('bookingInfo', JSON.stringify({
      ...bookingInfo,
      checkIn: bookingInfo.checkIn.toISOString(),
      checkOut: bookingInfo.checkOut.toISOString(),
    }));
  }, [bookingInfo]);

  const updateBookingInfo = (newInfo) => {
    setBookingInfo(prevInfo => {
      const updatedInfo = { ...prevInfo, ...newInfo };
      
     
      if (newInfo.checkIn) {
        updatedInfo.checkIn = new Date(newInfo.checkIn);
      }
      if (newInfo.checkOut) {
        updatedInfo.checkOut = new Date(newInfo.checkOut);
      }

      
      if (updatedInfo.checkOut <= updatedInfo.checkIn) {
        updatedInfo.checkOut = new Date(updatedInfo.checkIn);
        updatedInfo.checkOut.setDate(updatedInfo.checkOut.getDate() + 1);
      }

      
      if (newInfo.rooms !== undefined) {
        updatedInfo.rooms = Math.max(1, Math.min(4, Number(newInfo.rooms))); 
      }

      return updatedInfo;
    });
  };

  return (
    <BookingFormContext.Provider value={{ bookingInfo, updateBookingInfo }}>
      {children}
    </BookingFormContext.Provider>
  );
};

export default BookingProvider;

export const useBooking = () => useContext(BookingFormContext);