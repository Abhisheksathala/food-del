import orderModel from "../models/OrderModel.js";
import userModel from "../models/User.Model.js";
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51PEmMWSCbgAB5y2F40Kr7jo1suO91hGn353LguLU2pj4E3yjxfWZoJFNNowgN0HXdZdOijlTx4IW22lnoLmMWAPF00YjcREWLJ"
);

const placeOrder = async (req, res) => {
  const url = "http://localhost:5173";

  try {
    const { userId, items, amount, address } = req.body;

    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const order = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true,
    });

    await order.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${url}/verify?success=true&orderId=${order._id}&userId=${user._id}`,
      cancel_url: `${url}/verify?cancel=false&orderId=${order._id}&userId=${user._id}`,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error in placeOrder", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  try {
    // Validate request body (optional)
    const { orderId, success } = req.body;
    if (!orderId || !success || typeof success !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request body" });
    }

    const isPaymentSuccessful = success === "true";

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { payment: isPaymentSuccessful },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (isPaymentSuccessful) {
      return res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//user order for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in the ordercontroller" });
  }
};

//listing the order sfor damin panal

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in the ordercontroller" });
  }
};

//api for updateing orderStatus

const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status is updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in the ordercontroller" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
