import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
} from "../controller/doctorController.js";
const router = express.Router();
router.post("/getDoctorInfo", userAuth, getDoctorInfoController);
router.post("/updateProfile", userAuth, updateProfileController);
router.post("/getDoctorById", userAuth, getDoctorByIdController);
export default router;
