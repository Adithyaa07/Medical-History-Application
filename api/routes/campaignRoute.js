import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createCampaign, getCampaign} from '../controller/campaignController.js';

const router = express.Router();

router.post("/createCampaign", verifyToken, createCampaign);
router.get("/getCampaign", getCampaign);

export default router;