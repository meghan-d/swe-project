import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function OrderSummary() {
    const { bookingData } = useBooking();
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

    // Pricing based on ticket type
    const getPrice = (ticketType) => {
        switch (ticketType) {
            case "Child":
                return 7;
            case "Senior":
            case "Military":
                return 8;
            case "Adult":
            default:
                return 10;
        }
    };

    const totalPrice = bookingData.seats.reduce((sum, seat) => sum + getPrice(seat.ticketType), 0);

    return (
        <div className="p-6 shadow-md rounded-md border">
            <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>

            {/* Movie Info */}
            <div className="border-b pb-4 mb-4">
                <h1 className="text-lg font-semibold">Movie Details</h1>
                <p className="text-gray-800">{bookingData.movieTitle}</p>
                <p className="text-gray-800">{bookingData.selectedDate}</p>
                <p className="text-gray-800">{bookingData.showtimeTime}</p> {/* Show the TIME! */}
            </div>

            {/* Seats */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Selected Seats</h2>
                <ul className="text-gray-800">
                    {bookingData.seats.map((seat, index) => (
                        <li key={index} className="flex gap-2 py-2">
                            <span>{seat.seatLabel} ({seat.ticketType})</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cost */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Cost</h2>
                <ul className="text-gray-800">
                    {bookingData.seats.map((seat, index) => (
                        <li key={index}>
                            {seat.ticketType}: ${getPrice(seat.ticketType)}
                        </li>
                    ))}
                </ul>
                <p className="text-gray-800 font-bold mt-2">Total: ${totalPrice}</p>
            </div>

            {/* Action Buttons */}
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
