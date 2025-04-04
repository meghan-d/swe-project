import MovieCard from "./MovieCard";

export default function MovieList({ title, allowToBook, movies }) {
    return (
        <section className="mt-8 px-6">
            <h2 className="text-3xl mb-4">{title}</h2>
            <div className="flex gap-2.5 flex-wrap">
                {movies.map((movie) => ( //movies.map((movie,index))
                    <MovieCard 
                        key={movie.id} //key = {index}
                        id={movie.id}
                        title={movie.title} 
                        rating={movie.mpaa_rating}
                        poster={movie.trailer_picture} // ✅ Use `trailer_picture`
                        trailer={movie.trailer_video}
                        allowToBook={allowToBook}
                    />
                ))}
            </div>
        </section>
    );
}
