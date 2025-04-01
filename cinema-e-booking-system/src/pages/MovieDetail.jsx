import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  const movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      category: "Currently Running",
      cast: "Timothée Chalamet, Zendaya, Austin Butler",
      director: "Denis Villeneuve",
      producer: "Mary Parent, Cale Boyter",
      synopsis:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      reviews: ["Incredible visuals!", "A sci-fi masterpiece."],
      trailer_picture:
        "https://variety.com/wp-content/uploads/2024/02/MCDDUPA_WB037.jpg?w=1000&h=667&crop=1&resize=1920%2C1280",
      trailer_video: "https://www.youtube.com/embed/Way9Dexny3w?si=-lBYD1t1EY2vTegh",
      rating: "PG-13",
      showtimes: ["1:30 PM", "4:45 PM", "8:00 PM"],
    },
  ];

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) return <div className="p-6">Movie not found.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-sm text-gray-500">{movie.category}</p>
      <img src={movie.trailer_picture} alt={movie.title} className="rounded shadow-md w-full max-w-3xl" />
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Producer:</strong> {movie.producer}</p>
      <p><strong>Cast:</strong> {movie.cast}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <p><strong>Showtimes:</strong> {movie.showtimes.join(", ")}</p>
      <p><strong>Reviews:</strong></p>
      <ul className="list-disc ml-6">
        {movie.reviews.map((review, idx) => (
          <li key={idx}>{review}</li>
        ))}
      </ul>
      <video className="w-full max-w-3xl rounded mt-4" controls src={movie.trailer_video} />
    </div>
  );
};

export default MovieDetail;
