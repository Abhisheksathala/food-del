import React, { useContext, useEffect, useState } from "react";
import "./myorder.css";
import { StoreContext } from "../../context/Context";
import axios from "axios";

import { assets } from "./../../../../admin/src/assets/admin_assets/assets";

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchorders = async () => {
    try {
      const response = await axios.post(
        url + "/api/v1/order/userOrders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data.data);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);

  return (
    <div className="my-order">
      <h3>my orders</h3>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />

              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>items:{order.items.length}</p>
              <p>{order.payment ? "Paid" : "Not Paid"}</p>
              <p><span>.</span><b>{order.status}</b></p>
              {/* <p>{order.createdAt}</p> */}
              {/* <p>{order.address}</p> */}
              {/* <p>{order._id}</p> */}
              <button>track Order</button>
            </div>
          );
        })}
      
      </div>
    </div>
  );
};

export default Myorders;
