import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { StoreContext } from "./../../context/Context";

const FoodItem = ({ id, name, image, price, description }) => {
  const {cartItems, addToCart, RemoveFromCart} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={image} className="food-item-image" alt="img" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <span className="food-item-count">
            <img
              onClick={() => RemoveFromCart(id)}
              src={assets.remove_icon_red}
              alt="img"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </span>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name}</h3>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-dis">{description}</p>
        <p className="food-item-price">${price}</p> {/* Ensure price is displayed correctly */}
      </div>
    </div>
  );
};

export default FoodItem;
