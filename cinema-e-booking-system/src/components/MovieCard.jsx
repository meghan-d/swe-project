import React, {useState} from "react";

export default function MovieCard({ title, poster, trailer, allowToBook = true }) {

    const [playTrailer, setPlayTrailer] = useState(false);

    return (
        <div className="bg-white shadow-2xl p-4 flex flex-col items-center rounded-md w-[200px]">
            {/* Movie Poster */}
            <img 
                src={poster} 
                alt={title} 
                className="w-full h-60 object-cover"
            />

            {/* Movie Title */}
            <h3 className="text-2xl font-bold mt-2 text-center">{title}</h3>

            {/* Trailer Button */}
            {!playTrailer ? (
                <button
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full" 
                    onClick={() => setPlayTrailer(true)}
                >
                    Watch Trailer
                </button>
            ) : (
                <iframe
                    className="w-full h-40 mt-2"
                    src={trailer}
                    title={title}
                    allowFullScreen
                ></iframe>
            )}

            {/* Book Now Button */}
            {allowToBook && 
            (<button className="mt-3 px-3 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 w-full"
                onClick={() => alert("Book Now button clicked")}>
                Book Now
            </button>)
            }
        </div>
    );
}
