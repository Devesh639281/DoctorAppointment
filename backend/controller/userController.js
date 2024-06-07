import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordRegex from "password-regexp";
import moment from "moment";
import { Monei } from "@monei-js/node-sdk";
import dotenv from "dotenv";
// const { Monei } = require("@monei-js/node-sdk");
const monei = new Monei(process.env.PAY_SECRET_KEY);

export const registerController = async (req, res, next) => {
  try {
    const { name, password, email, answer, isAdmin } = req.body;
    passwordRegex();
    if (!name) {
      return res
        .status(404)
        .send({ success: false, message: "Name is required" });
    }
    if (!answer) {
      return res
        .status(404)
        .send({ success: false, message: "Answer is required" });
    }
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "Password is required ",
      });
    } else if (password.length < 6) {
      return res.status(404).send({
        success: false,
        message: "Password is  grater than six character ",
      });
    } else if (
      !/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`-]).*$/.test(
        password
      )
    ) {
      return res.status(400).send({
        success: false,
        message:
          "Password must contain at least one letter, one number, and one symbol",
      });
    }
    if (!email) {
      res.status(404).send({ success: false, message: "Email is required" });
    }
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      answer,
      isAdmin,
      password: hashedPassword,
    });
    res
      .status(201)
      .send({ success: true, message: "User Regiterd Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login Controller ${error.message}` });
  }
};

export const getUserInfoController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User data fetch Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching During User Detail ",
      success: false,
      error,
    });
  }
};

export const updateUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params._id },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "User profile is updated Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something wWent Wrong",
      success: false,
      error,
    });
  }
};

export const forgotpasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Email or Answer" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

export const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: req.body.userId,
    });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User Not found" });
    }
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong When getting user data",
    });
  }
};

export const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `Dr. ${newDoctor.firstName} ${newDoctor.lastName} Has applied for a Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      error,
      message: "Error Whilie Applying for Doctor",
    });
  }
};

export const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const notification = user.notification;
    const seenNotification = user.seenNotification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all Notification Marked as read",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error is Notification", error });
  }
};

export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification Deleted Successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to delete all Notification",
      error,
    });
  }
};

export const getAllDoctorController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });

    res.status(200).send({
      success: true,
      message: "Doctor List is Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While getting All Doctors",
      error,
    });
  }
};

// bookAppointmentController
export const bookAppointmentController = async (req, res) => {
  try {
    // normal date ko compare krne ke liye date iso format me hona chaiye
    req.body.date = moment(req.body.date, "DD:MM:YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = await appointmentModel.create(req.body);
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New_Appointment_Request",
      message: `A new Appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While booking Appointment",
      error,
    });
  }
};

export const bookingAvaliabiltyController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD:MM:YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    monei.payments
      .create({
        orderId: appointment.userId,
        amount: appointment.feePerConsultatin,
      })
      .then((result) => {
        console.log(result);
      });
    if (appointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Appointment not Avaliable this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment Avaliable",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Booking",
      error,
    });
  }
};

export const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "User's Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user appointments",
      error,
    });
  }
};

export const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointment = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointment fetched Successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While getting Doctor Appointmet List",
      error,
    });
  }
};

//   doctorAppointmentStatusUpdateController

export const doctorAppointmentStatusUpdateController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({
      _id: appointments.userId,
    });
    user.notification.push({
      type: "Status_Updated",
      message: `Your Appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated Successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error arrived During Updating Status",
      error,
    });
  }
};

// export const paymentCreation = async (req, res) => {
//   try {
//     const doctor = await doctorModel.findOne({
//       userId: req.body.userId,
//     });
//     const appointment = await appointmentModel.findByIdAndUpdate({
//       doctorId: doctor._id,
//     });
//     if(appointment){
//       monei.payments.create({ amount: appointment.feePerConsultation,currency:"EUR",orderId:appointment.userInfo._id,email:appointment.userInfo.email});
//     }
//     res.status(200).send({
//       success: true,
//       message: "Doctor List is Fetched Successfully",
//       data: doctors,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error While getting All Doctors",
//       error,
//     });
//   }
// };
