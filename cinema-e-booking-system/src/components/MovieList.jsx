import React, { useState } from "react";
import MovieCard from "./MovieCard";

const sampleMovies = [
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    },
    { 
        title: "Inception", 
        poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
        trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
    }
];

export default function MovieList({ title, allowToBook }) {
    const [movies] = useState(sampleMovies); // example movies

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
