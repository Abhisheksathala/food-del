import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const baseURL = "http://localhost:4000";

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/food/list`);
      console.log("Response:", response.data); // Check the full response structure
      if (response.data.success) {
        setList(response.data.foods); // Set the array to the list state
        console.log("Foods:", response.data.foods); // Check the foods array
      } else {
        toast.error("An error occurred while fetching the list.");
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any error that occurs
      toast.error(error.message);
    }
  };
  const removeFood = async (foodId) => {
    const responce = axios.post(`${baseURL}/api/v1/food/remove`, {
      id: foodId,
    });
    await fetchlist()
    if((await responce).data.success){
      toast.success((await responce).data.message)
    }
    else{
      toast.error((await responce).data.error)
    }
  };
  useEffect(() => {
    fetchlist();
  }, []); // Added baseURL as a dependency


  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          {" "}
          {/* Corrected class name */}
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={item._id} className="list-table-format">
            {" "}
            {/* Use item._id for key */}
            <img src={`${baseURL}/images/${item.image}`} alt={item.name} />{" "}
            {/* Use template literals */}
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <button onClick={() => removeFood(item._id)} className="cursor">
              {" "}
              {/* Corrected class name */}X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
