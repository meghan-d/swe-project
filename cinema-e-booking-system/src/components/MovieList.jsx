import React, { useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ title, allowToBook, movies }) {

    return (
        <section className="mt-8 px-6">
            <h2 className="text-3xl mb-4">{title}</h2>
            <div className="flex gap-2.5 flex-wrap">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={index} 
                        title={movie.title} 
                        poster={movie.poster} 
                        trailer={movie.trailer}
                        allowToBook={allowToBook}
                    />
                ))}
            </div>
        </section>
    );
}
