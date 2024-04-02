import express from "express";
import { create, getPatients, getRecords } from "../controller/patientController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { createRecords } from "../controller/patientController.js";
const router = express.Router();

router.post("/createPatient", verifyToken, create);
router.get("/getPatients", getPatients);
router.post("/:patientId/records", verifyToken, createRecords);
router.get("/:patientId/records", getRecords);

export default router;
