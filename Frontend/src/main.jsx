import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContext  from "./context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContext>
      <App />
    </StoreContext>
  </BrowserRouter>
);
