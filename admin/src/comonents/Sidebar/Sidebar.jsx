import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="siderbar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add items</p>
        </NavLink>
        <NavLink to="/list" className="siderbar-option">
          <img src={assets.order_icon} alt="" />
          <p>list items</p>
        </NavLink>
        <NavLink to="/order" className="siderbar-option">
          <img src={assets.order_icon} alt="" />
          <p>order items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
