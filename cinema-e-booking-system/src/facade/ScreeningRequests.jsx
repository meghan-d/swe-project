import axios from "axios";

const ScreeningRequests = {
    getAllScreenings: async () => {
        try {
            const response = await axios.get("http://localhost:5001/screenings");
            return response.data;
        } catch (error) {
            console.error("Error fetching screenings:", error);
        }
    },

    deleteScreening: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/screenings/${id}`)
            return response.data;
        } catch (error) {
            console.error("Error deleting screening:", error);
        }
    },

    getScreeningById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/screening-details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching screening:", error);
        }
    },

    saveShowing: async (showing) => {
        try {
            const response = await axios.post("http://localhost:5001/save-showing", showing)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    bookedShowings: async (auditorium, date) => {
        try {
            const response = await axios.get(`http://localhost:5001/booked-times/${auditorium}/${date}`);
            return response.data; 
        } catch (error) {
            throw error;
        }
    }
}

export default ScreeningRequests;