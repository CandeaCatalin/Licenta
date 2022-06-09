import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../../constants/APIUrls";
import { getData, storeData } from "../../constants/Storage";
import { User } from "../../Models";
export class UserAPI {
  baseUrl: string;
  _endpoints: Endpoints;

  constructor() {
    this._endpoints = {};
    this.baseUrl = baseUrl;
    this._endpoints = {
      register: "/api/Authentication/user/register",
      login: "/api/Authentication/user/login",
      logout: "/api/Authentication/logout",
      getUser: "/api/User/get",
      addQueue: "/api/Queue/add",
    };
  }

  getUser = async () => {
    const response = await fetch(this.baseUrl + this._endpoints.getUser, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getData("jwt")),
      },
    });
    const content = await response.json();
    if (content.status === 401) {
      throw "Unauthorized";
    }
    return content;
  };
  register = async (user: User, password: string, confirmPassword: string) => {
    const response = await fetch(this.baseUrl + this._endpoints.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...user, password, confirmPassword }),
    }).then();
    if (response.status === 201) {
      const content = await response.json();

      storeData("jwt", content.jwt);
      return true;
    } else {
      const content = await response.json();
      showMessage({
        message: content.message,
        type: "warning",
      });
      return false;
    }
  };
  login = async (email: string, password: string) => {
    const response = await fetch(this.baseUrl + this._endpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then();
    if (response.status === 200) {
      const content = await response.json();
      await storeData("jwt", content.jwt);
      return true;
    } else {
      const content = await response.json();

      showMessage({
        message: content.message,
        type: "warning",
      });
      return false;
    }
  };
  logOut = () => {
    AsyncStorage.removeItem("jwt");
    showMessage({
      message: "Logout Successful",
      type: "success",
    });
    return true;
  };
}

export default UserAPI;
