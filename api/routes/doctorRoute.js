import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create } from '../controller/doctorController.js';

const router = express.Router();

router.post('/create-doctor', verifyToken, create);

export default router;