import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    movieID: null,
    movieTitle: "",
    showtimeID: null,
    selectedDate: "",
    seats: [],
    ticketPrice: 10,
    cardType: "",
    cardNumber: null
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
