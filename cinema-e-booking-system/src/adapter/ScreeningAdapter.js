const ScreeningAdapter = {
    adapt(screening) {
      return {
        showId: screening.showID,
        movieId: screening.movieID,
        auditoriumId: screening.auditoriumID,
        showtimeId: screening.showtimeID,
        date: screening.date,
      };
    },
  
    adaptList(screenings) {
      return screenings.map(ScreeningAdapter.adapt);
    }
  };
  
  export default ScreeningAdapter;
  