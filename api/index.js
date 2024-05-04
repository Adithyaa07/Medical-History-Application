import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hospitalRoutes from "./routes/hospitalRoute.js";
import authRoutes from "./routes/authRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import patientRoute from "./routes/patientRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import campaignRoute from "./routes/campaignRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server listening on 3000");
});

app.use("/api/hospital", hospitalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);
app.use("/api/service", serviceRoute);
app.use("/api/campaign", campaignRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
