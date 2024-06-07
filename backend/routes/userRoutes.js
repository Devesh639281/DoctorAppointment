import express from "express";
import {
  registerController,
  loginController,
  authController,
  applyDoctorController,
  forgotpasswordController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorController,
  bookAppointmentController,
  bookingAvaliabiltyController,
  doctorAppointmentController,
  userAppointmentController,
  doctorAppointmentStatusUpdateController,
  getUserInfoController,
  updateUserProfileController,
} from "../controller/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotpasswordController);
router.post("/getUserdata", userAuth, authController);
router.post("/apply-doctor", userAuth, applyDoctorController);

router.post("/get-all-notification", userAuth, getAllNotificationController);
router.post(
  "/delete-all-notification",
  userAuth,
  deleteAllNotificationController
);

router.get("/getAllDoctors", userAuth, getAllDoctorController);

router.post("/book-appointment", userAuth, bookAppointmentController);
router.post("/booking-avalibility", userAuth, bookingAvaliabiltyController);
router.get("/user-appointments", userAuth, userAppointmentController);
router.get("/doctor-appointments", userAuth, doctorAppointmentController);
router.post(
  "/update-appointment-status",
  userAuth,
  doctorAppointmentStatusUpdateController
);
router.get("/getUserInfo/:_id", userAuth, getUserInfoController);
router.post("/updateUserProfile/:_id", userAuth, updateUserProfileController);
// router.post("/payment", userAuth, paymentCreation);

export default router;
