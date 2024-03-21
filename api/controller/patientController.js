import Patient from "../models/patientModel.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.hospital.isAdmin) {
    return next(
      errorHandler(401, "You are not authorized to create a patient")
    );
  }
  if (
    !req.body.name ||
    !req.body.gender ||
    !req.body.blood ||
    !req.body.age ||
    !req.body.phone
  ) {
    return next(errorHandler(400, "Please fill all the fields"));
  }
  const newPatient = new Patient({
    ...req.body,
    userId: req.hospital.id,
  });
  try {
    const savedPatient = await newPatient.save();
    res.status(201).json({
      success: true,
      Patient: savedPatient,
    });
  } catch (error) {
    next(error);
  }
};
