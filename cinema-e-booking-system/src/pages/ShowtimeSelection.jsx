import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
/*const showtimes = [
    { id: 1, date: "March 1st, 2025", times: ["4:00 PM", "6:00 PM", "7:00 PM"] },
    { id: 2, date: "March 2nd, 2025", times: ["5:00 PM", "7:00 PM"] },
    { id: 3, date: "March 3rd, 2025", times: ["4:00 PM", "6:00 PM", "8:00 PM"] },
    { id: 4, date: "March 4th, 2025", times: ["6:00 PM", "8:00 PM"] },
];*/

export default function ShowtimeSelection() {
    const { id } = useParams();
    const [selectedShowtime, setSelectedShowtime] = useState({ date: null, time: null });
    const [showtimes, setShowtimes] = useState([]);
  
    useEffect(() => {
        const fetchScreenings = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/screening-details/${id}`);
      
            const groupedShowtimes = res.data.reduce((dateblock, show) => {
              const formattedDate = new Date(show.date).toDateString();
      
              if (!dateblock[formattedDate]) {
                dateblock[formattedDate] = { id: show.showID, date: formattedDate, times: [] };
              }
      
              dateblock[formattedDate].times.push(show.showtime);
              return dateblock;
            }, {});
            
            setShowtimes(Object.values(groupedShowtimes));
          } catch (err) {
            console.error("Error fetching screenings:", err);
          }
        };
        fetchScreenings();
      }, [id]);
      


    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select a Show Time</h2>
            <div className="flex flex-col gap-6">
                {showtimes.map((showtime) => (
                    <div key={showtime.id} className="border-b pb-4 rounded shadow p-4">
                        <h3 className="text-lg font-semibold mb-2">{showtime.date}</h3>
                        <div className="flex gap-2 flex-wrap">
                            {showtime.times.map((time) => (
                                <button
                                    key={time}
                                    className={`px-3 py-1 rounded border ${selectedShowtime.date === showtime.date && selectedShowtime.time === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setSelectedShowtime({ date: showtime.date, time })}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 mt-2 rounded mt-5"
            onClick={() => window.location.href = '/select-seats'}>
              Book Show Time
            </button>
        </div>
    );
}
