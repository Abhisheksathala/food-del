import express from "express";
import cors from "cors";
import indexDB from "./src/config/db.js";
import foodRouter from "./src/routes/FoodRout.js"; // Uncomment this line
import userRouter from "./src/routes/UserRoute.js";
import CartRouter from "./src/routes/CartRout.js"
import authMiddleware from "./src/middleware/Auth.js"; // Add this line
import OrderRouter from "./src/routes/OrderRoute.js"
import "dotenv/config";


const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'], // Allow requests from the frontend origin
    methods: ["GET", "POST"], // Allow GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specified headers
  })
);

// API endpoint
app.use("/api/v1/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart",CartRouter)
app.use("/api/v1/order", OrderRouter);

app.use(express.json())
// DB connection
// Apply authentication middleware to a specific route

indexDB()
  .then(() => {
    app.get("/", (req, res, next) => {
      res.send("API working");
    });

    app.listen(port, () => {
      console.log(`Server started at Server.js on port ${port}`); // Template literals for better readability
    });
  })
  .catch((err) => {
    console.error("MONGODB CONNECTION FAILED", err);
    process.exit(1);
  });
