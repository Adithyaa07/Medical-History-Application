import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    price: { type: Number, required: true },
    status: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Services", serviceSchema);
export default Service;
