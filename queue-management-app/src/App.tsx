import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login, MainPage, Register} from "./Pages";
import {UserProvider} from "./Context/UserContext";
import {Toast} from "./Components/Toast";
import {QueueProvider} from "./Context/QueueContext";
import {ModalsProvider} from "./Context/ModalsContext";


export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <QueueProvider>
                    <ModalsProvider>
                        <Toast/>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Routes>
                    </ModalsProvider>
                </QueueProvider>
            </UserProvider>
        </BrowserRouter>
    );
}
