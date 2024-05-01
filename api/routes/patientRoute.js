import express from "express";
import {
  create,
  getPatients,
  getRecords,
  // getRec

} from "../controller/patientController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createRecords } from "../controller/patientController.js";
const router = express.Router();

router.post("/createPatient", verifyToken, create);
router.get("/getPatients", getPatients);
router.post("/:patientId/records", verifyToken, createRecords);
router.get("/:patientId/records", getRecords);
// router.get("/records", getRec);

export default router;
