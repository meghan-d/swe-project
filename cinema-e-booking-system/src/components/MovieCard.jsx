import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, rating, title, poster, trailer, allowToBook = true }) {
    const [playTrailer, setPlayTrailer] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-2xl p-4 flex flex-col items-center rounded-md w-[200px]">
            {/* Movie Poster */}
            <img 
                src={poster} 
                alt={title} 
                className="w-full h-60 object-cover"
                onError={(e) => e.target.src = "/default-poster.jpg"}  // ✅ Handle broken images
                onClick={(e) => navigate(`/movie-details/${id}`)}
            />

            {/* Movie Title */}
            <div className="flex-1 flex items-center justify-center w-full pt-2">
                <h3 className="text-2xl font-bold text-center">{title}</h3>
            </div>

            <div className="flex-1 flex items-center justify-center w-full pt-2">
                <h4 className="text-black text-center">{rating}</h4>
            </div>

            <div className="flex-1 flex flex-col justify-end w-full">
                {/* Trailer Button */}
                {!playTrailer ? (
                    <button
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" 
                        onClick={() => setPlayTrailer(true)}
                    >
                        Watch Trailer
                    </button>
                ) : (
                    <div>
                        <iframe
                            className="w-full h-40 mt-2"
                            src={trailer}  // ✅ Make sure this receives correct trailer link
                            title={title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                        <button
                            className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full" 
                            onClick={() => setPlayTrailer(false)}
                        >
                            Exit Trailer
                        </button>
                    </div>
                )}

                {/* Book Now Button */}
                {allowToBook && (
                    <button 
                        className="mt-3 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        onClick={() => navigate(`/select-showtime/${id}`)}
                    >
                        Book Now
                    </button>
                )}
            </div>
        </div>
    );
}