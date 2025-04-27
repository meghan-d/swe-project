import axios from "axios";

const ShowtimesRequests = {
    getShowtimes: async () => {
        try {
            const response = await axios.get("http://localhost:5001/showtimes"); 
            return response.data; 
        } catch (error) {
            console.error("Error fetching showtimes:", error);
        }
    }
} 
export default ShowtimesRequests;