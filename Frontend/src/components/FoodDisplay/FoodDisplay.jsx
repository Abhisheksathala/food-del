import "./FoodDisplay.css";
import React, { useContext } from "react";
import { StoreContext } from "../../context/Context";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  if (!context) {
    console.error("StoreContext not found");
    return null;
  }

  const { food_list = [] ,url} = context; // Provide a default value

  // console.log(food_list);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if(category==="All" || item.category===category){
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={url+"/images/"+item.image}
                price={item.price}
                description={item.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
