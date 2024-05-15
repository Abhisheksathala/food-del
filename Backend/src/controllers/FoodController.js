import foodModel from "../models/Food.Model.js";
import fs from "fs";

// Add food
const addFood = async (req, res) => {
  try {
    // Assuming 'filename' is coming from the 'file' object in 'req'
    let img_filename = req.file.filename;

    // Create a new food document using the foodModel
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: img_filename, // Save the image filename in the document
    });

    // Save the new food document to the database
    await food.save();

    // Send a success response to the client
    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food: food,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error adding food:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add food",
      error: err.message,
    });
  }
};

//show all food list 
// Define an asynchronous function to list all food items.
const listFood = async (req, res) => {
  try {
    // Retrieve all food items from the database.
    const foods = await foodModel.find({})

    // Send a success response with a status code of 201 (Created).
    res.status(201).json({
      success: true,
      message: "FoodList shown successfully",
      foods: foods, // Include the retrieved list of food items in the response.
    })
  } catch (err) {
    // Log the error to the console if the listing process fails.
    console.error("Error food list:", err);
    // Send an error response with a status code of 500 (Internal Server Error).
    res.status(500).json({
      success: false,
      message: "Failed to show food list error",
      error: err.message, // Include the error message in the response.
    });
  }
}

// remove food from the  database

// Define an asynchronous function to remove a food item.
const removeFood = async (req, res) => {
  try {
    // Find the food item in the database using the ID from the request body.
    const food = await foodModel.findById(req.body.id)
    // Delete the image file associated with the food item from the server.
    fs.unlink(`uploads/${food.image}`,()=>{})

    // Delete the food item from the database using the provided ID.
    await foodModel.findByIdAndDelete(req.body.id)

    // Send a success response with a status code of 201 (Created).
    res.status(201).json({
      success: true,
      message: "Food removed successfully",
    });
  } catch (error) {
    // Log the error to the console if the removal process fails.
    console.error("The Food is not removed due to:"+error)
    // Send an error response with a status code of 500 (Internal Server Error).
    res.status(500).json({
      success: false,
      message: "Failed to remove food",
      error: error.message,
    })  
  }
}


export { addFood,listFood,removeFood};
