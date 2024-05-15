import  mongoose  from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default:{},
    },
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
