import React from "react";
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProtectedRoute from "./hooks/protectedRoute";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            {/* <Route element={<ProtectedRoute />} /> */}
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
