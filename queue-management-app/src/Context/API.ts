import {User} from "../Models";
import {toast} from "react-hot-toast";

export class QueueManagementAPI {
    baseUrl: string;
    _endpoints: Endpoints;

    constructor() {
        this._endpoints = {};
        this.baseUrl = "https://localhost:5001";
        this._endpoints = {
            register: '/api/Authentication/register',
            login: '/api/Authentication/login',
            logout: '/api/Authentication/logout',
            user: '/api/User',
        };
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
    login = async (email:string,password:string) =>{
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
    logOut = async ()=>{
        const response = await fetch(this._endpoints.logout,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });
        const  content = await response.json();
        if (content.message ==="Logout Successful"){
            toast.success(content.message);
            return true;
        }else{
            toast.error(content.message);
            return false;
        }
    }
}

export default QueueManagementAPI;
