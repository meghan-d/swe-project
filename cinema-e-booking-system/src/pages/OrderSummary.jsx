import React from "react";

export default function OrderSummary() {
    const orderDetails = {
        movieTitle: "Inception",
        date: "March 1, 2025",
        time: "8:00 PM",
        seats: ["A1", "A2", "A3"],
        payment: { cardNumber: "**** **** **** 1234", expiration: "1/26" },
        total: 32.25,
    };

    return (
        <div className="p-6 shadow-md rounded-md border">
            <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
            <div className="border-b pb-4 mb-4">
                <h1 className="text-lg font-semibold">Movie Details</h1>
                <p className="text-gray-800">{orderDetails.movieTitle}</p>
                <p className="text-gray-800">{orderDetails.date}</p>
                <p className="text-gray-800">{orderDetails.time}</p>
            </div>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Selected Seats</h2>
                <p className="text-gray-800">{orderDetails.seats.join(", ")}</p>
            </div>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Payment Details</h2>
                <p className="text-gray-800">Card Number: {orderDetails.payment.cardNumber}</p>
                <p className="text-gray-800">Expiration: {orderDetails.payment.expiration}</p>
            </div>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">Total</h2>
                <p className="text-gray-800">${orderDetails.total}</p>
            </div>
            <div className="flex gap-3 justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => window.location.href = '/order-confirmation'}>
                    Confirm Order
                </button>
                <button className="bg-gray-500 text-white px-10 py-2 rounded-md hover:bg-gray-600"
                onClick={() => window.location.href = '/'}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
