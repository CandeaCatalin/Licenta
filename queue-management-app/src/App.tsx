import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./Pages";
import {Login, MainPage, Register} from "./Pages";
import {UserProvider} from "./Context/UserContext";
import {Toast} from "./Components/Toast";


export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>

                <Toast/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
