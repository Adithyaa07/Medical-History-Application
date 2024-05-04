import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    offer: {
      type: "string",
      required: true,
    },
    hospital: { type: "string", required: true },
    Message: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaigns", campaignSchema);
export default Campaign;
