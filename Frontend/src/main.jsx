import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // <- ini wajib supaya Tailwind bekerja

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
