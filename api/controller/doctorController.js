import Doctor from "../models/doctorModel.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.hospital.isAdmin) {
    return next(errorHandler(401, "You are not authorized to create a doctor"));
  }
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.specialization ||
    !req.body.password ||
    !req.body.phone
  ) {
    return next(errorHandler(400, "Please fill all the fields"));
  }
  const newDoctor = new Doctor({
    ...req.body,
    userId: req.hospital.id,
  });
  try {
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    next(error);
  }
};
