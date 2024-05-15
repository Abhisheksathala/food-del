import express from "express"
import authMiddleware from "./../middleware/Auth.js"
 import {
    addToCart,
    removeFromCart,
    getCart
 } from '../controllers/CartController.js'

const CartRouter = express.Router()

CartRouter.post("/add",authMiddleware,addToCart)
CartRouter.post("/remove",authMiddleware,removeFromCart)
CartRouter.post("/get",authMiddleware,getCart)

export default CartRouter

