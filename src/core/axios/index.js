import axios from "axios";
import AuthJWT from "core/AuthJWT";

class axiosClient {
  constructor() {
    this.client = axios.create({
      withCredentials: true,
      baseURL: process.env.REACT_APP_API_URL,
    });
    this.auth = new AuthJWT();
  }

  get = (url) => {
    let token = this.auth.getToken();
    if (token) {
      if (this.auth.isTokenExpired(token)) {
        token = this.renew_jwt();
      }
      return this.client.get(url, {
        headers: {
          Authorization: "Bearer " + this.auth.getToken(),
          "Content-Type": "application/json",
        },
      });
    } else {
      window.location.replace("/login");
    }
  };

  post = (url, data) => {
    let token = this.auth.getToken();
    if (token) {
      if (this.auth.isTokenExpired(token)) {
        token = this.renew_jwt();
      }
      return this.client.post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    } else {
      window.location.replace("/login");
    }
  };

  renew_jwt = () => {
    //renovar token
  };

  login = (data) => {
    return this.client.post("/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });
  };

  signup = (data) => {
    return this.client.post("/auth/signup", data, {
      headers: { "Content-Type": "application/json" },
    });
  };

  put = (url, data) => {
    let token = this.auth.getToken();
    if (token) {
      if (this.auth.isTokenExpired(token)) {
        token = this.renew_jwt();
      }
      return this.client.put(url, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    } else {
      window.location.replace("/login");
    }
  };

  delete = (url) => {
    let token = this.auth.getToken();
    if (token) {
      if (this.auth.isTokenExpired(token)) {
        token = this.renew_jwt();
      }
      return this.client.delete(url, {
        headers: {
          Authorization: "Bearer " + this.auth.getToken(),
          "Content-Type": "application/json",
        },
      });
    } else {
      window.location.replace("/login");
    }
  };
}

export default axiosClient;
