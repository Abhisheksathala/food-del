// Import necessary modules and components.
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./comonents/Navbar/Navbar";
import Sidebar from "./comonents/Sidebar/Sidebar";

// Import page components for different routes.
import Adds from "./Pages/Add/Adds.jsx";
import List from "./Pages/List/List.jsx";
import Order from "./Pages/orders/Order.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the main App component.
const App = () => {
  return (
    // Main container div.
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar /> 
        <Routes>
          <Route path="/add" element={<Adds />} /> // Route for the 'Add' page.
          <Route path="/list" element={<List />} /> // Route for the 'Add' page.
          <Route path="/order" element={<Order />} /> // Route for the 'Add'
          page.
        </Routes>
      </div>
    </div>
  );
};

// Make the App component available for import in other files.
export default App;
