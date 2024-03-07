import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    specialization: { type: "string", required: true },
    phone: { type: Number, required: true },
    category: { type: "string", default: "doctor" },
    isAdmin: {
      type: "boolean",
      default: true,
    },
  },

  { timestamps: true }
);

const Doctor = mongoose.model("Doctors", doctorSchema);
export default Doctor;
