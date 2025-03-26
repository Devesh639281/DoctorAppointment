import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
        await mongoose.connect(`mongodb+srv://rabbit956516:devesh9565
@doctapt.1me3oyc.mongodb.net/DoctAppDbName?retryWrites=true&w=majority&appName=DoctAPT`);

    console.log(`Mongo Connected ${mongoose.connection.host}`.bgRed.blue);
  } catch (error) {
    console.log(`Mongoose Server Issues ${error}`.bgRed.white);
  }
};
export default connectDB;
