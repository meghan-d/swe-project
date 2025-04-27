import axios from "axios";

const LoginRequests = {
    loginUser: async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5001/login", {
                username: email,
                password: password
            })
            return response.data
        } catch (error) {
            console.error("Login request failed.");
        }
    }
}
export default LoginRequests;