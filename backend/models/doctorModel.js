import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is  required"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is  required"],
    },

    email: {
      type: String,
      required: [true, "email is  required"],
    },

    phone: {
      type: Number,
      required: [true, "phone number is  required"],
    },

    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is  required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is  required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is  required"],
    },
    feePerConsultation: {
      type: String,
      required: [true, "fee is  required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    timings: {
      type: Object,
      required: [true, "Work Timing is  required"],
    },
  },
  { timestamps: true }
);
const doctorModel = mongoose.model("doctors", doctorSchema);
export default doctorModel;
