import express from 'express';
import { signOut, test } from '../controller/hospitalController.js';

const router = express.Router();

router.get('/test', test)
router.post('/signout', signOut)

export default router;