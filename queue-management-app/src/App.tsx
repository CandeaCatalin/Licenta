import React from "react";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import "./Pages";
import {Login, MainPage, Register} from "./Pages";


export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>

          </Routes>
      </BrowserRouter>
  );
}
