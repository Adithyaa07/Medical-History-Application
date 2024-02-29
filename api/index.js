import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hospitalRoutes from "./routes/hospitalRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
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
app.use('/api/auth', authRoutes);
