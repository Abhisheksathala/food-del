import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"food pending"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        required:true
    
    }
},{timestamps:true})

const orderModel = mongoose.model("order",orderSchema)

export default orderModel;