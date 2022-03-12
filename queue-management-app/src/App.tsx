import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, MainPage, OperateQueuePage, Register } from "./Pages";
import { UserProvider } from "./Context/UserContext";
import { Toast } from "./Components/Toast";
import { QueueProvider } from "./Context/QueueContext";
import { ModalsProvider } from "./Context/ModalsContext";

export default function App() {
  return (
    <BrowserRouter>
      <QueueProvider>
        <UserProvider>
          <ModalsProvider>
            <Toast />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/queue/:id-:queueName"
                element={<OperateQueuePage />}
              />
            </Routes>
          </ModalsProvider>
        </UserProvider>
      </QueueProvider>
    </BrowserRouter>
  );
}
