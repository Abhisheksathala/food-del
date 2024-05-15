import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/Context";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const Verify = async () => {
    try {
      const response = await axios.post(url + "/api/v1/order/verify", {
        orderId,
        success,
      });
      if (response.data.success) {
        // Fetch actual order details to confirm payment status
        const orderResponse = await axios.get(url + "/api/v1/order/" + orderId);
        if (orderResponse.data.payment) {
          navigate("/myorders");
        } else {
          navigate("/myorders"); // Payment not verified on server-side
        }
      }
    } catch (error) {
      console.error("Error verifying payment:", error.message);
      navigate("/");
    }
  };
};
export default Verify;
