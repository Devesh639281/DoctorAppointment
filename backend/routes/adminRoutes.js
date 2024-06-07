import express from "express";
import {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
} from "../controller/adminController.js";

import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/getAllUser", getAllUsersController);
router.get("/get-all-doctors", userAuth, getAllDoctorsController);

// change Account Status
router.post("/changeAccountStatus", userAuth, changeAccountStatusController);
export default router;
