import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import ModalContextProvider from "./contexts/ModalContext.jsx";
import QuizContextProvider from "./contexts/QuizContext.jsx";

import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuizContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalContextProvider>
      </QuizContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
