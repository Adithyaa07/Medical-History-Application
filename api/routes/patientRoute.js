import express from "express";
import { create, getPatients } from "../controller/patientController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/createPatient", verifyToken, create);
router.get("/getPatients", getPatients);
export default router;
