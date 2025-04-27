import axios from "axios";

const VerificationRequests = {
    verifyEmail: async (email, verificationCode) => {
        try {
            const response = await axios.post("http://localhost:5001/verify-email", { email, verificationCode });
            return response.data;
        } catch (error) {
            console.error("Error verifying code:", error.response)
        }
    }
}
export default VerificationRequests;