import * as authController from '../controllers/authController';
import express from 'express';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.post('/refresh-token', authController.refreshAccessToken);

export default router;