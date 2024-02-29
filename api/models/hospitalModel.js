import { timeStamp } from "console";
import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    registerID: {
      type: Number,
      required: true,
      unique: true,
    },
    HospitalName: {
      type: "string",
      required: true,
    },

    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    address: { type: "string", required: true },
  },
  { timeStamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
