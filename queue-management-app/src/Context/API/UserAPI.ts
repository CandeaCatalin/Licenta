import { User } from "../../Models";
import { toast } from "react-hot-toast";
import { Queue } from "../../Models/Queue";

export class UserAPI {
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
    const response = await fetch(this._endpoints.getUser, {
      method: "get",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const content = await response.json();
    if (content.status === 401) {
      throw "Unauthorized";
    }
    return content;
  };
  register = async (user: User, password: string, confirmPassword: string) => {
    const response = await fetch(this._endpoints.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...user, password, confirmPassword }),
    }).then();
    if (response.status === 200) {
      return true;
    } else {
      const content = await response.json();
      toast.error(content.message);
      return false;
    }
  };
  login = async (email: string, password: string) => {
    const response = await fetch(this._endpoints.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (response.statusText === "OK") {
      return true;
    } else {
      const content = await response.json();
      toast.error(content.message);
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

export default UserAPI;
