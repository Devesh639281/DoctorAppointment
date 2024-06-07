import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({ success: true, message: "users data", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Fetching All user Detail",
      success: true,
      error,
    });
  }
};
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res
      .status(200)
      .send({ success: true, message: "Doctor data List", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Fetching All Doctors Detail",
      success: true,
      error,
    });
  }
};

export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request is ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status is Updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while changing status" });
  }
};
