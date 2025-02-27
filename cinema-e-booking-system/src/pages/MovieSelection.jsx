import React from "react";

const movies = [
  { id: 1, title: "Movie 1", category: "Currently Running" },
  { id: 2, title: "Movie 2", category: "Coming Soon" },
];

const MovieSelection = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select a Movie</h2>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded shadow">
            <h3 className="text-lg">{movie.title}</h3>
            <p className="text-sm text-gray-500">{movie.category}</p>
            <button className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            onClick={() => window.location.href = '/select-showtime'}>
              Book Movie
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSelection;