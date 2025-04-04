import "./SeatSelection.css";
import React, { useState } from "react";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
      
      {/* Screen */}
      <div className="w-full h-12 bg-gray-300 rounded mb-8 flex items-center justify-center text-gray-600">
        Screen
      </div>

      {/* Seat Legend */}
      <div className="flex gap-4 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded border"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded border"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded border"></div>
          <span>Taken</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-8 gap-3 max-w-3xl mx-auto">
        {[...Array(40)].map((_, i) => (
          <button 
            key={i} 
            onClick={() => toggleSeat(i)}
            disabled={[3, 12, 25, 34].includes(i)} // Some seats marked as taken
            className={`
              w-8 h-8 rounded-t-lg border
              ${[3, 12, 25, 34].includes(i) 
                ? "bg-gray-400 cursor-not-allowed" 
                : selectedSeats.includes(i)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {String.fromCharCode(65 + Math.floor(i/8))}{i % 8 + 1}
          </button>
        ))}
      </div>

      {/* Selected Seats Summary */}
      <div className="mt-8 text-center">
        <p className="font-md mb-4">Selected Seats:</p> 
        <div className="flex flex-col items-center">
          {selectedSeats.map((seat)=> (
            <div key={seat} className="flex items-center gap-4 mb-2">
              <span>
                {String.fromCharCode(65 + Math.floor(seat/8))}{seat % 8 + 1}
              </span>
              <select className="p-1 border rounded">
                <option value="Adult">Adult - $10</option>
                <option value="Senior">Senior (60+) - $8</option>
                <option value="Military">Military - $8</option>
                <option value="Child">Child (12 and under) - $7</option>
              </select>
            </div>
          ))}
        </div>
        <button 
          onClick={() => window.location.href = '/order-summary'}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;