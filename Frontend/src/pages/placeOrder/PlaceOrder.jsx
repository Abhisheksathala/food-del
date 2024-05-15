import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmont, token, food_list, url, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];

        orderItems.push(itemInfo);
      }
    });

    console.log(orderItems);
    let orderData = {
      address: `${data.street}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`,
      items: orderItems,
      amount: getTotalCartAmont() + 2,
      payment: "tok_visa",
    };

    try {
      let response = await axios.post(
        url + "/api/v1/order/place",
        { ...orderData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("error");
      }
    } catch (error) {
      console.error(error);
      alert("error", error);
    }
  };

  useEffect(() => {
   
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmont() === 0) {
      navigate("/cart");
    }
  }, [token, navigate]);

  return (
    <form onSubmit={placeorder} action="" className="place-order">
      <div className="PlaceOrder-left">
        <p className="title">Delivery info</p>
        <div className="muli-fields">
          <input
            name="firstName"
            type="text"
            onChange={onChangeHandler}
            value={data.firstName}
            id=""
            placeholder="First name"
            required // Added required attribute
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            id=""
            placeholder="Last name"
            required // Added required attribute
          />
        </div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email-Address"
          required // Added required attribute
        />

        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          id=""
          placeholder="Street"
          required // Added required attribute
        />
        <div className="muli-fields">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            id=""
            placeholder="City name"
            required // Added required attribute
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State name"
            required // Added required attribute
          />
        </div>
        <div className="muli-fields">
          <input
            type="text"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            placeholder="Zip code"
            required // Added required attribute
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required // Added required attribute
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
          required // Added required attribute
        />
      </div>
      <div className="placeorder-right">
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
                <p>${getTotalCartAmont() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmont() === 0 ? 0 : getTotalCartAmont() + 2}
                </b>
              </div>
              <button type="submit">Proceed to pay</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
