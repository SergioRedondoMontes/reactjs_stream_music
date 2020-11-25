import axios from "axios";
import AuthJWT from "core/AuthJWT";

class axiosClient {
  constructor() {
    this.client = axios.create({
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
      window.location.replace("/");
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
      window.location.replace("/");
    }
  };

  renew_jwt = () => {
    //renovar token
  };

  login = (data) => {
    return this.client.post("/auth/login", data, {
      withCredentials: true,
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
      window.location.replace("/");
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
      window.location.replace("/");
    }
  };
}

export default axiosClient;
