import axios from "axios";

const BookingRequests = {
    saveBooking: async (bookingData) => {
        try {
            const response = await axios.post("http://localhost:5001/booking", {
                userID: bookingData.userID,
                bookingDate: bookingData.bookingDate,
                showtimeID: bookingData.showtimeID,
                noOfTickets: bookingData.noOfTickets,
                totalPrice: bookingData.totalPrice,
            });
            return response.data;
        } catch (error) {
            console.error("Error saving booking:", error);
            throw error;
        }
    },
};

export default BookingRequests;
