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

export const getPatients = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const patients = await Patient.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.name && { name: req.query.name }),
      ...(req.query.patientId && { _id: req.query.patientId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { blood: { $regex: req.query.searchTerm, $options: "i" } },
          { age: { $regex: req.query.searchTerm, $options: "i" } },
          {
            "records.complaints": {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
          { "records.doctor": { $regex: req.query.searchTerm, $options: "i" } },
          {
            "records.prescription": {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
          {
            "records.diagnosis": {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
          {
            "records.treatment": {
              $regex: req.query.searchTerm,
              $options: "i",
            },
          },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPatients = await Patient.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonth = await Patient.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ patients, totalPatients, lastMonth });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const createRecords = async (req, res, next) => {
  if (!req.hospital.isAdmin) {
    return next(
      errorHandler(401, "You are not authorized to create a patient record")
    );
  }
  if (
    !req.body.complaints ||
    !req.body.doctor ||
    !req.body.prescription ||
    !req.body.diagnosis ||
    !req.body.treatment
  ) {
    return next(errorHandler(400, "Please fill fields"));
  }
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return next(errorHandler(404, "Patient not found"));
    }
    patient.records.push(req.body);
    await patient.save();
    res.status(201).json({
      success: true,
      Patient: patient,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return next(errorHandler(404, "Patient not found"));
    }
    res.status(200).json({ records: patient.records });
  } catch (error) {
    next(error);
  }
};

// export const getRec = async (req, res, next) => {
//   try {
//     const rec = await Patient.find(req.params.userId);
//     if (!rec) {
//       return next(errorHandler(404, "Record not found"));
//     }
//     res.status(200).json({ records: rec.records });
//   } catch (error) {
//     next(error);
//   }
// };
