import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is  required"],
  },
  email: {
    type: String,
    required: [true, "Email is  required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is  required"],
    trim: true,
  },
  answer: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seenNotification: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
