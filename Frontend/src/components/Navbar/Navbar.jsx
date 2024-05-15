import React, { useContext, useState } from "react";
import "./nav.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmont, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logOut = () => {
    console.log("u log ot ");
    localStorage.removeItem("token");
    setToken(null);
    Navigate('/')
  };

  return (
    <div className="nav">
      <Link to="/">
        <img src={assets.logo} className="logo" alt="" />
      </Link>
      <ul className="nav-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#exploreMenu"
          onClick={() => {
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#appdwonload"
          onClick={() => {
            setMenu("mobile-app");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact us");
          }}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="search" />
        <div className="nav-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmont() === 0 ? "" : "dot"}>{}</div>

          {!token ? (
            <button
              onClick={() => {
                setshowLogin(true);
              }}
            >
              {" "}
              sing in
            </button>
          ) : (
            <div className="nav-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdewon">
                <li onClick={()=>navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p>orders</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={assets.logout_icon} alt="" />
                  <p>logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
