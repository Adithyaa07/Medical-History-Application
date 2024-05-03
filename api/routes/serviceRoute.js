import express from 'express';

import { createService, getService } from '../controller/serviceController.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/createService", verifyToken, createService);
router.get("/getService", getService);

export default router;