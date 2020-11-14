import axios from "axios";

const API_SIGNIN_URL = "http://localhost:8080/api/auth/";
const API_SIGNUP_URL = "http://localhost:8080/api/users/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_SIGNIN_URL, {
        username,
        password,
      })
      .then((response) => {
        console.log("AuthService response", response);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, name, password) {
    return axios.post(API_SIGNUP_URL, {
      username,
      name,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
