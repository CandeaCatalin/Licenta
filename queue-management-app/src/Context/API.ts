import {User} from "../Models";
import {toast} from "react-hot-toast";
import axios from "axios";

export class QueueManagementAPI {
    baseUrl: string;
    _endpoints: Endpoints;

    constructor() {
        this._endpoints = {};
        this.baseUrl = "https://queuemanagementlicenta.azurewebsites.net";
        this._endpoints = {
            register: '/api/Authentication/admin/register',
            login: '/api/Authentication/admin/login',
            logout: '/api/Authentication/logout',
            user: '/api/User/get',
        };
    }


    getUser = async () => {
        const response = await axios({
            method: "get",
            url: this.baseUrl + this._endpoints.user,
        });

        return response.data;

    };
    register = async (user: User, password: string, confirmPassword: string) => {
        const response = await fetch(this.baseUrl + this._endpoints.register, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({...user, password, confirmPassword}),
        });
        const content = await response.json();
        if (content.message === undefined) {
            toast.success("Account registered! Please activate your account.");
            return true;
        } else {
            toast.error(content.message);
            return false;
        }
    }
    login = async (email: string, password: string) => {
        const response = await fetch(this._endpoints.login, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email, password}),
        });
        const content = await response.json();
        if (content.message === undefined) {
            return true;
        } else {
            toast.error(content.message);
            return false;
        }
    }
    logOut = async () => {
        const response = await fetch(this._endpoints.logout, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
    }
}

export default QueueManagementAPI;
