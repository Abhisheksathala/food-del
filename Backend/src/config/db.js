import mongoose from "mongoose";

export const indexDB = async () => {
  try {
    const password = "ABHISHEK9949"; // Replace <your_password_here> with your actual password
    const ConnectDBInstance = await mongoose.connect(
      `mongodb+srv://abhisheksathala296:${password}@cluster0.dgfpdlw.mongodb.net/`
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
