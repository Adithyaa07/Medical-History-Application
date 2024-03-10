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
    res.status(201).json({
      success: true,
      doctor: savedDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctors = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const doctors = await Doctor.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.doctorId && { _id: req.query.doctorId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { email: { $regex: req.query.searchTerm, $options: "i" } },
          { specialization: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalDoctors = await Doctor.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonth = await Doctor.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ doctors, totalDoctors, lastMonth });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  // if (req.hospital.id !== req.params.userId) {
  //   return next(errorHandler(401, "You are not authorized to delete a doctor"));
  // }
  try {
    await Doctor.findByIdAndDelete(req.params.userId);
    res.status(200).json("The post has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
