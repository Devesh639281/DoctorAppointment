import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import Stripe from "stripe";
import path from "path";
const stripe = new Stripe("your_secret_key", {
  apiVersion: "2020-08-27",
});
// import cors from "cors";
dotenv.config();
connectDB();
const port = process.env.PORT || 9000;
const app = express();
app.use(bodyParser.json());
// app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use(morgan("dev"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../"));
});
app.listen(port, () => {
  console.log(
    `Server is Running on Port ${process.env.NODE_MODE} Mode on ${process.env.PORT}`
      .bgGreen.bold.red
  );
});
