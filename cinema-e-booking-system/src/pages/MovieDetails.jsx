import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './MovieDetails.css';
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  //added this
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/movie-details/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
      });
  }, [id]);

  //added this
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

  if (!movie) return <p className="p-6">Loading...</p>;

  return (
    <div className="movie-card">
      <div className="movie-details-container">
        <div className="left-column">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-poster-wrapper">
            <img
              src={movie.trailer_picture || "/default-poster.jpg"}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
        </div>

        <div className="right-column">
          <div className = "top-right-column">
          <p className="movie-category">{movie.category}</p>
          {movie.category === 'Currently Running' && (
            <button className="book-button" onClick={() => navigate(`/select-showtime/${id}`)}> Book Now</button>
          )}
          </div>
          <div className="movie-info">
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Producer:</strong> {movie.producer}</p>
            <p><strong>Cast:</strong> {movie.cast}</p>
            <p><strong>Rating:</strong> {movie.mpaa_rating}</p>
            <p><strong>Synopsis:</strong> {movie.synopsis}</p>
          </div>

          {movie.trailer_video && (
            movie.trailer_video.includes("youtube") ? (
              <iframe
              src={`${movie.trailer_video}&autoplay=1&mute=1`}
              title="Trailer"
              className="w-full aspect-video mt-4 rounded"
              allowFullScreen
              allow="autoplay"
            />

            ) : (
              <video
                className="movie-trailer"
                controls
                src={movie.trailer_video}
              />
            )
          )}
          </div>
          <div className="screenings-row">
          {movie.category === 'Currently Running' && (
  <div>
    <h1 className="text-xl font-semibold mb-4">Available Showtimes</h1>
    <div className="screenings-container">
      {showtimes.map((showtime) => (
        <div key={showtime.id} className="border-b pb-4 rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">{showtime.date}</h3>
          <div className="flex gap-2 flex-wrap">
            {showtime.times.map((time) => (
              <button
                key={time}
                className="px-3 py-1 rounded border border-yellow-400 bg-black text-yellow-400 cursor-default"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
          </div>
      </div>
  );
};

export default MovieDetails;