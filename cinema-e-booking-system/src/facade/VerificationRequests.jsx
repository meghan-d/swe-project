import axios from "axios";

const VerificationRequests = {
    verifyEmail: async (email, verificationCode) => {
        try {
            const response = await axios.post("http://localhost:5001/verify-email", { email, verificationCode });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    verifyResetCode: async (email, verificationCode) => {
        try {
            const verificationResponse = await axios.post("http://localhost:5001/verify-reset-code", {
                email,
                verificationCode
            });
            return verificationResponse.data;
        } catch (error) {
            throw error;
        }
    },
    resetPassword: async (email, verificationCode, newPassword) => {
        try {
            const response = await axios.post("http://localhost:5001/reset-password", {
                email,
                verificationCode,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    sendResetCode: async (email) => {
        try {
            const response = await axios.post("http://localhost:5001/send-reset-code", { email })
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default VerificationRequests;