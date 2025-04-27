import axios from "axios";

const ProfileRequests = {
    changePassword: async (userId, passwordData) =>{
        try {
            const response = await axios.post("http://localhost:5001/change-password", {
                userId,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },

    updateCard: async (originalCardNumber, profile) => {
        try {
            const response = await axios.put("http://localhost:5001/update-card", {
                originalCardNumber,
                updatedCard: profile.selectedCard
            });
            return response.data;
        } catch (error) {
            console.error("Failed to update card, error")
            throw error;
        }
    },

    updateProfile: async (userId, profile) => {
        try {
          const response = await axios.post("http://localhost:5001/update-profile", {
            userId,
            name: profile.name,
            phone: profile.phone,
            street: profile.street,
            city: profile.city,
            state: profile.state,
            zip: profile.zip,
            promotions: profile.promotions ? 1 : 0,
          });
          return response.data;
        } catch (error) {
          console.error("Error updating profile:", error);
          throw error;
        }
    },

    addNewCard: async (userId, cardData) => {
        try {
          const response = await axios.post("http://localhost:5001/add-new-card", {
            userId,
            ...cardData,
          });
          return response.data;
        } catch (error) {
          console.error("Error adding new card:", error);
          throw error;
        }
      },

    deleteCard: async (userId, cardNumber) => {
        try {
            const response = await axios.post("http://localhost:5001/delete-card", { userId, cardNumber });
            return response.data;
        } catch (error) {
            throw error;
        }
      },

    getUserProfile: async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/edit-profile?userId=${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}
export default ProfileRequests;