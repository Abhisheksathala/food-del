// Importing React and the useState hook from the React library.
import React, { useState } from "react";
// Importing the CSS file for styling the component.
import "./Add.css";
// Importing assets from a specified path.
import { assets } from "../../assets/admin_assets/assets";

// impport aexios

import axios from "axios"
import { toast } from "react-toastify";

// Defining the 'Add' component.
export const Add = () => {
  // useState hook to manage the image state, initially set to false.
  const [image, setImage] = useState(false);
  // useState hook to manage the form data state, with initial values for name, description, price, and category.
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  // Handler function for changes in the form inputs.
  const onchangeHandler = (e) => {
    // Extracting the name of the input field from the event object.
    const name = e.target.name;
    // Extracting the value of the input field from the event object.
    const value = e.target.value;
    // Updating the data state with the new value, preserving previous data entries.
    setData(data => ({ ...data, [name]: value }));
  };
  const url = "http://localhost:4000";
  // Function that handles submitting the form.
  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    console.log(data);
    const fromdata = new FormData();
    fromdata.append("name",data.name);
    fromdata.append("description",data.description);
    fromdata.append("price",Number(data.price));
    fromdata.append("category",data.category);
    fromdata.append("image",image);
    const response = await axios.post(`${url}/api/v1/food/add`,fromdata)
    if(response.data.success){
        setData({
          name: "",
          description: "",
          price: "",
          category: "salad",
        })
        setImage(false)
        console.log(response.data.message);
        toast.success(response.data.message)
    }else{
     toast.error(response.data.error)
    }
  }

  // The component's return statement, which describes the UI to render.
  return (
    <div className="add">
      {/* Form element with a class for styling. */}
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image upload section with styling classes. */}
        <div className="add-img-upload flex-col">
          <p>upload Image</p>
          {/* Label for the file input, displaying an image preview or a default image. */}
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          {/* Hidden file input for image upload, triggers setImage when a file is selected. */}
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" style={{ display: "none" }} required />
        </div>
        {/* Product name input section with styling classes. */}
        <div className="add-Product-name flex-col">
          <p>product name</p>
          {/* Text input for product name, triggers onchangeHandler when the value changes. */}
          <input onChange={onchangeHandler} required value={data.name} type="text" name="name" placeholder="type here" id="" />
        </div>
        {/* Product description input section with styling classes. */}
        <div className="add-Product-description flex-col">
          <p>product description</p>
          {/* Textarea for product description, triggers onchangeHandler when the value changes. */}
          <textarea onChange={onchangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="write your description"
            id=""
            required
          ></textarea>
        </div>
        {/* Product category and price input section with styling classes. */}
        <div className="add-category-price">
          {/* Product category selection section with styling classes. */}
          <div className="add-category flex-col">
            <p>product category</p>
            {/* Select input for product category, triggers onchangeHandler when the value changes. */}
            <select onChange={onchangeHandler} value={data.category} name="category" id="">
              {/* Options for the select input, representing different product categories. */}
              <option value="salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="sandwitch">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="pure veg">Pure Veg</option>
              <option value="pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          {/* Product price input section with styling classes. */}
          <div className="add-price">
            <p>product price</p>
            {/* Number input for product price, triggers onchangeHandler when the value changes. */}
            <input onChange={onchangeHandler} required value={data.price} type="number" name="price" placeholder="$20" id="" />
          </div>
        </div>
        {/* Submit button for the form with a class for styling. */}
        <button  type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

// Exporting the Add component as the default export.
export default Add;
