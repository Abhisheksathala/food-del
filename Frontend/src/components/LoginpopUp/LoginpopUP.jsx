import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./LoginpopUP.css";

import React, { useContext, useState } from "react";

import {StoreContext} from "../../context/Context";

import axios from "axios";

const LoginpopUP = ({ setshowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  if (!url || !setToken) {
    console.error("url or setToken is undefined");
    return null; // or some error handling
  }

  const [currentState, setCurrentState] = useState("sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
  
    if (currentState === "Login") {
      newUrl += "/api/v1/user/login";
    } else {
      newUrl += "/api/v1/user/register";
    }
    
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        // Add try...catch around localStorage.setItem
        try {
          localStorage.setItem("token", response.data.token);
        } catch (error) {
          console.error('Error saving to localStorage', error);
        }
        setshowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  
  

  return (
    <div className="loginpopup">
      <form onSubmit={onLogin} action="" className="login-pop-up-conttainer">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setshowLogin(false)}
            alt=""
          />
        </div>
        <div className="login-popup-inpute">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Username"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div className="login-popup-button">
          <button type="submit">
            {currentState === "sign up" ? "Create an account" : "Login"}
          </button>
        </div>
        <div className="lgoin-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms of Service and Privacy Policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            create new account{" "}
            <span onClick={() => setCurrentState("sign up")}>click here</span>
          </p>
        ) : (
          <p>
            already have an account{" "}
            <span onClick={() => setCurrentState("Login")}>click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginpopUP;
