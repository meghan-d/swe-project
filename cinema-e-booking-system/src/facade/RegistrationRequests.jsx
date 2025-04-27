import axios from "axios";

const RegistrationRequest = {
    registerUser: async (newUser) => {
        try {
            const res = await axios.post("http://localhost:5001/register", newUser);
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // specific user error
              } else {
                alert('An error occurred. Please try again later.'); // general error
              }
        }
    }
}
export default RegistrationRequest;