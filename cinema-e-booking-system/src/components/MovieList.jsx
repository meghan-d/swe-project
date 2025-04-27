import MovieCard from "./MovieCard";
import MovieAdapter from "../adapter/MovieAdapter";

export default function MovieList({ title, allowToBook, movies }) {
    const adaptedMovies = MovieAdapter.adaptList(movies); 

    return (
        <section className="mt-8 px-6">
            <h2 className="text-3xl mb-4">{title}</h2>
            <div className="flex gap-2.5 flex-wrap">
                {adaptedMovies.map((movie) => (
                    <MovieCard 
                        key={movie.movieId} 
                        id={movie.movieId}
                        title={movie.title}
                        rating={movie.mpaaRating} 
                        poster={movie.trailerPicture} 
                        trailer={movie.trailerVideo}
                        allowToBook={allowToBook}
                    />
                ))}
            </div>
        </section>
    );
}
