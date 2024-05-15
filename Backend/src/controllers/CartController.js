import userModel from "./../models/User.Model.js";

// add to cart items
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.updateOne({ _id: req.body.userId }, { $set: { cartData: cartData } });
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(201).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    console.error("Error in addToCart", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// removefrom cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId];
    }
    await userModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { cartData: cartData } },
      { new: true } 
    );
    res.status(201).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
  }
};


// get cart items

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addToCart, removeFromCart, getCart };
