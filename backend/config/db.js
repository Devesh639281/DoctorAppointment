import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Connected ${mongoose.connection.host}`.bgRed.blue);
  } catch (error) {
    console.log(`Mongoose Server Issues ${error}`.bgRed.white);
  }
};
export default connectDB;
