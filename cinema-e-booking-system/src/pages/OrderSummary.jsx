import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function OrderSummary() {
  const { bookingData, setBookingData } = useBooking();

  const navigate = useNavigate();

  if (!bookingData.movieID || !bookingData.showtimeID || bookingData.seats.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Booking information incomplete. Please start again.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const totalPrice = bookingData.seats.reduce((sum, seat) => sum + seat.getPrice(), 0);
  console.log(totalPrice);
  const handleDeleteSeat = (seatLabel) => {
    setBookingData(prev => ({
      ...prev,
      seats: prev.seats.filter(seat => seat.seatLabel !== seatLabel),
      totalPrice: totalPrice
    }));
  };

  return (
    <div className="p-6 shadow-md rounded-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>

      <div className="border-b pb-4 mb-4">
        <h1 className="text-lg font-semibold">Movie Details</h1>
        <p className="text-gray-300">{bookingData.movieTitle}</p>
        <p className="text-gray-300">{bookingData.selectedDate}</p>
        <p className="text-gray-300">{bookingData.showtimeTime}</p>
      </div>

      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold">Selected Seats</h2>
        <ul className="text-gray-300">
          {bookingData.seats.map((seat, index) => (
            <li key={index} className="flex justify-between items-center py-2">
              <span>{seat.seatLabel} ({seat.type}) - ${seat.getPrice()}</span> 
              <button
                onClick={() => handleDeleteSeat(seat.seatLabel)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold">Cost</h2>
        <p className="text-gray-300 font-bold mt-2">Total: ${totalPrice}</p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => navigate("/select-seats")}
        >
          Update Order
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => navigate("/checkout")}
        >
          Continue to Checkout
        </button>
        <button
          className="bg-gray-500 text-white px-10 py-2 rounded-md hover:bg-gray-600"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

