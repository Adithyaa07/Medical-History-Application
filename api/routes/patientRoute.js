import express from "express";
import { create } from "../controller/patientController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/createPatient", verifyToken, create);
export default router;
