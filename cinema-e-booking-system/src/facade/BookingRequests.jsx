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
    getBookingHistory: async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/order-history/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error getting booking history:", error);
            throw error;
        }
    },
    sendBookingConfirmation: async (orderDetails, email) => {
        try {
            const response = await axios.post("http://localhost:5001/send-confirmation", {
                orderDetails: orderDetails,
                email: email
              });
              return response.data;
        } catch (error) {
            console.error("Error sending booking confirmation:", error);
            throw error;
        }
    }
};

export default BookingRequests;
