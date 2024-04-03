import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  complaints: { type: String, required: true },
  doctor: { type: String, required: true },
  prescription: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  category: {
    type: String,
    default: 'records',
  },
});

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
    category: {
      type: String,
      default: 'patient',
    },
    records: [recordSchema],
  },

  { timestamps: true }
);

const Patient = mongoose.model("Patients", patientSchema);
export default Patient;
