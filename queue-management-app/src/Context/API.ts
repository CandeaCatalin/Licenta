import {User} from "../Models";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export class QueueManagementAPI {
    baseUrl: string;
    _endpoints: Endpoints;

    constructor() {
        this._endpoints = {};
        this.baseUrl = "https://localhost:5001";
        this.setEndpoints(this.baseUrl, {
            register: '/api/Authentication/register',
            login: '/api/Authentication/login',
            logout: '/api/Authentication/logout',
            user: '/api/User',
        });
    }

    protected setEndpoints(baseUrl: string, endpointsObject: Record<string, unknown>) {
        const endpoints: Endpoints = {};
        for (const [key, value] of Object.entries(endpointsObject)) {
            endpoints[key] = baseUrl + value;
        }
        this._endpoints = endpoints;
    }

    getUser = async () => {
        const response = await fetch(this._endpoints.user, {
            headers: {"Content-Type": "application/json"},
        });
        const content = await response.json();
        if (content.id !== undefined) {
            return content;
        }
    };
    register = async (user: User, password: string, confirmPassword: string) => {
        const response = await fetch(this._endpoints.register, {
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

}

export default QueueManagementAPI;
