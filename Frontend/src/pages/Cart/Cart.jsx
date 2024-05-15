
import React, { useContext } from "react";
import "./Cart.css";
import  {StoreContext}  from "../../context/Context"; // Assuming this is how you import your context
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, RemoveFromCart, getTotalCartAmont,url } =
    useContext(StoreContext); 

    const navigate =  useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>Name:{item.name}</p>
                  <p>price:${item.price}</p>
                  <p>Quantity:{cartItems[item._id]}</p>
                  <p>Total Cost:${item.price * cartItems[item._id]}</p>
                  <button onClick={() => RemoveFromCart(item._id)}>x</button>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmont()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping fee</p>
              <p>${getTotalCartAmont()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmont()===0?0:getTotalCartAmont() + 2}</b>
            </div>
            <button onClick={() =>navigate("/order")}>Proceed to Checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If You have a promocode</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter promocode" />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
