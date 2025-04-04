import React, { useState, useEffect} from "react";
import "./ScheduleMovie.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleMovies = () => {
    const navigate = useNavigate();
    const[successMessage, setSuccessMessage] = useState();
    const [movies, setMovies] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [bookedShowings, setBookedShowings] = useState([]); // To store booked showings

    const [formData, setFormData] = useState({
        movie: "", // This holds the selected movie
        auditorium: "",
        showtime: "",
        date: "",
        time: ""
    });

    useEffect(() => {
        fetchPlayingMovies();
        fetchAuditoriums();
        fetchShowtimes();
      }, []);
    
      useEffect(() => {
        // Fetch booked showings whenever auditorium, date, or movie changes
        if (formData.auditorium && formData.date) {
          fetchBookedShowings(formData.auditorium, formData.date);
        }
      }, [formData.auditorium, formData.date]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => { //Occurs when the save button is pressed
        e.preventDefault();

        const showing = {movie: formData.movie, auditorium: formData.auditorium, showtime: formData.showtime,
            date: formData.date, time: formData.time};
        
        saveShowing(showing);
    };

    const saveShowing = async (showing) => {
        try {
            const response = await axios.post("http://localhost:5000/save-showing", showing)
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                navigate("/admin-schedule");
              }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message)
            } else {
                alert("An error occurred. Please try again later.");
            }
        }
    }

    const fetchPlayingMovies = async () => {
        try {
            const response = await axios.get("http://localhost:5000/movies/currently-running");
            console.log("Fetched Movies:", response.data);
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    const fetchAuditoriums = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auditoriums");
            console.log("Fetched Auditoriums:", response.data);
            setAuditoriums(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    const fetchShowtimes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/showtimes");
            console.log("Fetched showtimes:", response.data);
            
            setShowtimes(response.data);
        } catch (error) {
            console.error("Error fetching showtimes:", error);
        }
    };

//added these
    const fetchBookedShowings = async (auditorium, date) => {
        try {
          const response = await axios.get(`http://localhost:5000/booked-times/${auditorium}/${date}`);
          //console.log("Fetched Booked Showings:", response.data);
          setBookedShowings(response.data); // Set booked showings
        } catch (error) {
          console.error("Error fetching booked showings:", error);
        }
      };
    
      // Function to check if the showtime is already booked
      const isShowtimeBooked = (showtimeId) => {
        return bookedShowings.includes(parseInt(showtimeId));
    };

    return (  
        <div className="schedulemovies-container">
            <h2 className="title">🎟️ Schedule a Movie</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="movies-form">
        
            <div className="form-group">
            <label className="label"> Movie Title * </label>
                <select name="movie" value={formData.movie} onChange={handleChange} className="input" required>
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}> {movie.title} </option>))}
                </select>
            </div>
            <div className="form-group">
            <label className="label"> Auditorium * </label>
                <select name="auditorium" value={formData.auditorium} onChange={handleChange} className="input" required>
                    <option value="">Select an Auditorium</option>
                    {auditoriums.map((auditorium) => (
                        <option key={auditorium.id} value={auditorium.id}> {auditorium.auditoriumName} </option> ))}
                </select>
            </div>
            <div className="form-group">
                <label className="label">Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="input" required />
            </div>
            <div className="form-group">
            <label className="label"> Showtime * </label>
                <select name="showtime" value={formData.showtime} onChange={handleChange} className="input" required>
                    <option value="">Select a Showtime</option>
                    {showtimes.map((showtime) => (
                        <option key={showtime.id} value={showtime.id}  disabled={isShowtimeBooked(showtime.showtimeID)}
                        style={{
                            backgroundColor: isShowtimeBooked(showtime.id) ? "#f0f0f0" : "",
                            color: isShowtimeBooked(showtime.id) ? "#aaa" : "",
                        }}> {showtime.timeStamp} </option> ))}
                </select>
            </div>
            <div className = "button-group">
                <button type="submit" className="button button-save"> Save Showing</button>
                <button type="button" className="button button-cancel" onClick={() => navigate(-1)}> Cancel </button>
            </div>
            </form>
        </div>
    )
}
export default ScheduleMovies;