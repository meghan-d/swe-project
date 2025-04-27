import axios from "axios";

const AuditoriumRequests = {
    fetchAuditoriums: async () => {
        try {
            const response = await axios.get("http://localhost:5001/auditoriums");
            return response.data
        } catch (error) {
            console.error("Error fetching auditoriums:", error);
        }
    }
}
export default AuditoriumRequests;