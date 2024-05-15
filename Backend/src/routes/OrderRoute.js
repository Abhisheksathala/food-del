import express from "express"
import authMiddleware from "../middleware/Auth.js"
import { placeOrder } from "../controllers/OrderController.js"
import { verifyOrder } from "../controllers/OrderController.js"
import { userOrders } from "../controllers/OrderController.js"
import { listOrders } from "../controllers/OrderController.js"
import { updateStatus } from "../controllers/OrderController.js"


const OrderRouter = express.Router()

OrderRouter.post("/place",authMiddleware,placeOrder)
OrderRouter.post("/verify",authMiddleware,verifyOrder) 
OrderRouter.post("/userOrders",authMiddleware,userOrders) 
OrderRouter.get("/list",listOrders) 
OrderRouter.post("/status",updateStatus) 

export default OrderRouter
                                    