import express from 'express';
import { signupController } from '../controllers/signup.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { googleLoginController } from '../controllers/googlelogin.controller.js';
const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);

export default router;
