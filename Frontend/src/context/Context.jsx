import axios from "axios";

import { createContext, useEffect } from "react";
// import { food_list } from "../assets/food del assets/frontend_assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null);

const storeContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      // Corrected the typo here
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // Prepare the data for the request
  const data = { itemId };

  // Make a request to the protected route
  try {
    const response = await axios.post(url+'/api/v1/cart/add', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Handle the response
    console.log(response.data);
  } catch (error) {
    // Handle the error
    console.error(error);
  }
  };

  const RemoveFromCart = async (itemid) => {
    setCartItems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    if(token){
    const response =  await axios.post(url+"/api/v1/cart/remove",{itemid},{ headers: {
        'Authorization': `Bearer ${token}`
      }})
  // Handle the response
  console.log(response.data);
      if (response.data.success) {
      setCartItems((prev) => {
        if (prev[itemid] > 1) {
          return { ...prev, [itemid]: prev[itemid] - 1 };
        } else {
          const { [itemid]: _, ...rest } = prev;
          return rest;
        }
      });
    }
    }
  };

  const getTotalCartAmont = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
      }
      let itemInfo = food_list.find((x) => x._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      // console.log("Fetching food list...");
      const response = await axios.get(url + "/api/v1/food/list");
      console.log("Response received:", response.data);
      setFood_list(response.data.foods);
      console.log("Food list updated:", food_list);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // console.log(
  //   fetchFoodList()
  // )
  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/v1/cart/get",{},{ headers: {
      'Authorization': `Bearer ${token}`
    }})
    setCartItems(response.data.cartData)
}

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      console.log(fetchFoodList());
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    // This useEffect will run whenever foodList changes
    console.log("Current food list:", food_list);
  }, [food_list]);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    RemoveFromCart,
    getTotalCartAmont,
    url,
    setToken,
    token,
    fetchFoodList,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default storeContextProvider;
