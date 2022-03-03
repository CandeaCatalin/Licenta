import { User } from "../Models";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Queue } from "../Models/Queue";

export class QueueManagementAPI {
  baseUrl: string;
  _endpoints: Endpoints;

  constructor() {
    this._endpoints = {};
    this.baseUrl = "https://localhost:5001";
    this._endpoints = {
      register: "/api/Authentication/admin/register",
      login: "/api/Authentication/admin/login",
      logout: "/api/Authentication/logout",
      getUser: "/api/User/get",
      addQueue: "/api/Queue/add",
    };
  }

  getUser = async () => {
    const response = await axios({
      method: "get",
      url: this._endpoints.getUser,
      withCredentials: true,
    });
    return response.data;
  };
  register = async (user: User, password: string, confirmPassword: string) => {
    try {
      await axios({
        method: "post",
        url: this.baseUrl + this._endpoints.register,
        data: {
          ...user,
          password,
          confirmPassword,
        },
        baseURL: this.baseUrl,
        withCredentials: true,
      });

      toast.success("Account registered! Please activate your account.");
      return true;
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message);
    }
  };
  login = async (email: string, password: string) => {
    try {
      await axios({
        method: "post",
        url: this._endpoints.login,
        data: {
          email,
          password,
        },
        baseURL: this.baseUrl,
        withCredentials: true,
      });

      return true;
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message);
      return false;
    }
  };
  logOut = async () => {
    const response = await fetch(this._endpoints.logout, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    if (content.message === "Logout Successful") {
      toast.success(content.message);
      return true;
    } else {
      toast.error(content.message);
      return false;
    }
  };
  addQueue = async (queue: Queue) => {
    const response = await fetch(this._endpoints.addQueue, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(queue),
    }).then();
    const content = await response.json();
    if (response.statusText === "OK") {
      toast.success("Queue added successfully");
      return true;
    } else {
      toast.error(content.message);
      return false;
    }
  };
}

export default QueueManagementAPI;
