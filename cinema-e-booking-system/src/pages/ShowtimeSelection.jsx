import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useBooking } from "../context/BookingContext";

export default function ShowtimeSelection() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedShowtime, setSelectedShowtime] = useState({ date: null, time: null, showID: null });
    const [showtimes, setShowtimes] = useState([]);
    const { bookingData, setBookingData } = useBooking();

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/screening-details/${id}`);
                const groupedShowtimes = res.data.reduce((dateblock, show) => {
                    const formattedDate = new Date(show.date).toDateString();
                    if (!dateblock[formattedDate]) {
                        dateblock[formattedDate] = { date: formattedDate, times: [] };
                    }
                    dateblock[formattedDate].times.push({ time: show.showtime, showID: show.showID });
                    return dateblock;
                }, {});
                setShowtimes(Object.values(groupedShowtimes));
            } catch (err) {
                console.error("Error fetching screenings:", err);
            }
        };
        fetchScreenings();
    }, [id]);

    const handleSelectShowtime = (date, time, showID) => {
        setSelectedShowtime({ date, time, showID });
    };

    const handleBookShowtime = () => {
        if (!selectedShowtime.showID) {
            alert("Please select a showtime first!");
            return;
        }

        setBookingData(prev => ({
          ...prev,
          selectedDate: selectedShowtime.date,
          showtimeID: selectedShowtime.showID,
          showtimeTime: selectedShowtime.time 
        }));
        

        navigate("/select-seats");
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select a Show Time</h2>
            <div className="flex flex-col gap-6">
                {showtimes.map((showtimeBlock) => (
                    <div key={showtimeBlock.date} className="border-b pb-4 rounded shadow p-4">
                        <h3 className="text-lg font-semibold mb-2">{showtimeBlock.date}</h3>
                        <div className="flex gap-2 flex-wrap">
                            {showtimeBlock.times.map((timeBlock) => (
                                <button
                                    key={timeBlock.time}
                                    className={`px-3 py-1 rounded border ${
                                        selectedShowtime.date === showtimeBlock.date &&
                                        selectedShowtime.time === timeBlock.time
                                            ? "bg-blue-500 text-white"
                                            : "bg-black"
                                    }`}
                                    onClick={() => handleSelectShowtime(showtimeBlock.date, timeBlock.time, timeBlock.showID)}
                                >
                                    {timeBlock.time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button 
                className="bg-blue-500 text-white px-3 py-1 mt-5 rounded"
                onClick={handleBookShowtime}
            >
                Book Show Time
            </button>
        </div>
    );
}
