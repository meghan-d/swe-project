import axios from "axios";

const MovieRequests = {
    getAllMovies: async () => {
        try {
            const response = await axios.get("http://localhost:5001/movies");
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    },

    getMovieById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/movie-details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    },

    saveMovie: async (movie) => {
        try {
            const response = await axios.post("http://localhost:5001/save-movie", movie);
            return response.data;
        } catch (error) {
            console.error("Error saving movie:", error);
        }
    },

    deleteMovie: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/movies/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    },

    getMovieByCategory: async () => {
        try {
            const response = await axios.get("http://localhost:5001/movies/currently-running");
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
};

export default MovieRequests;