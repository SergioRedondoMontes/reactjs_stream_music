import Axios from "core/axios";
import AuthJWT from "core/AuthJWT";

class AuthServices {
  constructor() {
    this.service = new Axios();
    this.auth = new AuthJWT();
  }

  login = (data) => {
    return this.service.login(JSON.stringify(data)).then((response) => {
      this.auth.setToken(response.data.JWT);
      this.auth.setEmail(response.data.email);
      return response;
    });
  };

  signup = (data) => {
    return this.service.signup(JSON.stringify(data)).then((response) => {
      this.auth.setToken(response.data.JWT);
      this.auth.setEmail(response.data.email);
      return response;
    });
  };
}

export default AuthServices;
