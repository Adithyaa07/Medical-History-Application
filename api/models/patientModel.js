import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    gender: { type: "string", required: true },
    blood: { type: "string", required: true },
    age: { type: "string", required: true },
    phone: { type: Number, required: true },

    isAdmin: {
      type: "boolean",
      default: false,
    },
  },

  { timestamps: true }
);

const Patient = mongoose.model("Patients", patientSchema);
export default Patient;
