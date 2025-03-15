// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExchangeDataProvider } from "./ExchangeDataContext";
import { ProfileProvider } from "./ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <ExchangeDataProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </ExchangeDataProvider>
  </LanguageProvider>
);
