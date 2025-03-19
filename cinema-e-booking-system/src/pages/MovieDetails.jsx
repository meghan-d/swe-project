import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const MovieDetails = () => {
    const { id } = useParams(); // ✅ Get `id` from URL
    const [movie, setMovie] = useState(null);
    console.log(id);
    useEffect(() => {
        // Use axios to fetch movie details
        axios
            .get(`http://localhost:5000/movie-details/${id}`)
            .then((response) => {
                setMovie(response.data); // Set movie data from axios response
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <img 
                src={movie.trailer_picture || "/default-poster.jpg"} 
                alt={movie.title} 
                className="w-64 h-96 object-cover rounded-lg shadow-lg" 
            />
        </div>
    );
};

export default MovieDetails;