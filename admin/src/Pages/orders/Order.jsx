import React from "react";
import { useState } from "react";
import axios from "axios";
import "./order.css";

import { toast } from "react-toastify";
import { assets } from "./../../assets/admin_assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const feachAllorders = async () => {
    const response = await axios.get("http://localhost:4000/api/v1/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("error");
    }
    console.log(response);
  };
  const statusHandler = async (event,orderId) => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/order/status",{orderId,status:event.target.value}
    );
    if (response.data.success) {
      toast.success("updated successfully");
      await feachAllorders()
    }

 
    console.log(event,orderId);
    

  };
  useState(() => {
    feachAllorders();
  }, []);
  return (
    <div className="order add">
      <h1>order page</h1>

      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + "  x " + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="order-item">{order.address}</p>
                <p>{order.payment ? "Paid" : "Not Paid"}</p>
                <p>items:{order.items.length}</p>
                <p>${order.amount}</p>
                <select
                  className="select"
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="food processing">food processing</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
