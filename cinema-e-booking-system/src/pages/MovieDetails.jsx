// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios"; // Import axios

// const MovieDetails = () => {
//     const { id } = useParams(); // ✅ Get `id` from URL
//     const [movie, setMovie] = useState(null);
//     console.log(id);
//     useEffect(() => {
//         // Use axios to fetch movie details
//         axios
//             .get(`http://localhost:5000/movie-details/${id}`)
//             .then((response) => {
//                 setMovie(response.data); // Set movie data from axios response
//             })
//             .catch((error) => {
//                 console.error("Error fetching movie details:", error);
//             });
//     }, [id]);

//     if (!movie) return <p>Loading...</p>;

//     return (
//         <div className="flex flex-col items-center p-6">
//             <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//             <img 
//                 src={movie.trailer_picture || "/default-poster.jpg"} 
//                 alt={movie.title} 
//                 className="w-64 h-96 object-cover rounded-lg shadow-lg" 
//             />
//         </div>
//     );
// };

// export default MovieDetails;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './MovieDetails.css';


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/movie-details/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movie) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-sm text-gray-500">{movie.category}</p>

      <img
        src={movie.trailer_picture || "/default-poster.jpg"}
        alt={movie.title}
        className="rounded shadow-md w-full max-w-2xl"
      />

      <div className="space-y-2">
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Producer:</strong> {movie.producer}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
        <p><strong>Showtimes:</strong> 
          {Array.isArray(movie.showtimes)
            ? movie.showtimes.join(", ")
            : typeof movie.showtimes === "string"
              ? JSON.parse(movie.showtimes).join(", ")
              : "N/A"}
        </p>
      </div>

      {movie.reviews?.length > 0 && (
        <>
          <p className="font-semibold">Reviews:</p>
          <ul className="list-disc ml-6">
            {movie.reviews.map((review, idx) => (
              <li key={idx}>{review}</li>
            ))}
          </ul>
        </>
      )}

      {movie.trailer_video && (
        movie.trailer_video.includes("youtube")
          ? (
            <iframe
              src={movie.trailer_video}
              title="Trailer"
              className="w-full aspect-video mt-4 rounded"
              allowFullScreen
            />
          ) : (
            <video
              className="w-full max-w-3xl rounded mt-4"
              controls
              src={movie.trailer_video}
            />
          )
      )}
    </div>
  );
};

export default MovieDetails;

// const MovieDetails = () => {
//     // Hardcoded sample movie
//     const movie = {
//       title: "Dune: Part Two",
//       category: "Currently Running",
//       cast: "Timothée Chalamet, Zendaya, Austin Butler",
//       director: "Denis Villeneuve",
//       producer: "Mary Parent, Cale Boyter",
//       synopsis:
//         "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
//       reviews: ["Mind-blowing visuals!", "Better than Part One.", "10/10 sci-fi masterpiece."],
//       trailer_picture:
//         "https://variety.com/wp-content/uploads/2024/02/MCDDUPA_WB037.jpg?w=1000&h=667&crop=1&resize=1920%2C1280",
//       trailer_video: "https://www.w3schools.com/html/mov_bbb.mp4", // or a YouTube embed link
//       rating: "PG-13",
//       showtimes: ["1:30 PM", "4:45 PM", "8:00 PM"],
//     };
  
//     return (
//       <div className="p-6 space-y-4 max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold">{movie.title}</h1>
//         <p className="text-sm text-gray-500">{movie.category}</p>
  
//         <img
//           src={movie.trailer_picture}
//           alt={movie.title}
//           className="rounded shadow-md w-full max-w-2xl"
//         />
  
//         <div className="space-y-2">
//           <p><strong>Director:</strong> {movie.director}</p>
//           <p><strong>Producer:</strong> {movie.producer}</p>
//           <p><strong>Cast:</strong> {movie.cast}</p>
//           <p><strong>Rating:</strong> {movie.rating}</p>
//           <p><strong>Synopsis:</strong> {movie.synopsis}</p>
//           <p><strong>Showtimes:</strong> {movie.showtimes.join(", ")}</p>
//         </div>
  
//         {movie.reviews.length > 0 && (
//           <>
//             <p className="font-semibold">Reviews:</p>
//             <ul className="list-disc ml-6">
//               {movie.reviews.map((review, idx) => (
//                 <li key={idx}>{review}</li>
//               ))}
//             </ul>
//           </>
//         )}
  
//         <video
//           className="w-full max-w-3xl rounded mt-4"
//           controls
//           src={movie.trailer_video}
//         />
//       </div>
//     );
//   };
  
//   export default MovieDetails;
  