import {Router} from 'express'
import { dashboard_search, login, register } from '../controller/userController.js';
const router = Router();
router.post('/register' , register);
router.post('/login' , login);
router.post('/login' , dashboard_search);

// router.get('/dashboard' , dashboard);
export default router;