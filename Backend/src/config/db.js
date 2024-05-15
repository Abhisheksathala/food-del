import mongoose from "mongoose";

export const indexDB = async () => {
  try {
    const password = "ABHISHEK9949"; // Replace <your_password_here> with your actual password
    const ConnectDBInstance = await mongoose.connect(
      process.env.MONGO_DB_URI
    );
    console.log(
      "\n- CONNECTED TO MONGODB FROM INDEXdb OF CONFIG",
      ConnectDBInstance.connection.host
    );
  } catch (err) {
    console.error("MONGODB CONNECTION ERROR IN CONFIG_FILE:", err);
    process.exit(1);
  }
};
export default indexDB;
