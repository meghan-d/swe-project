const MovieAdapter = {
    adapt(movie) {
      return {
        movieId: movie.id,
        title: movie.title,
        category: movie.category,
        genre: movie.genre,
        cast: movie.cast,
        director: movie.director,
        producer: movie.producer,
        synopsis: movie.synopsis,
        trailerPicture: movie.trailer_picture,
        trailerVideo: movie.trailer_video,
        mpaaRating: movie.mpaa_rating,
        duration: movie.duration, 
      };
    },
  
    adaptList(movies) {
      return movies.map(MovieAdapter.adapt);
    }
  };
  
  export default MovieAdapter;
  