import {Router} from 'express'
import {register} from '../controller/userController.js';
const router = Router();
router.post('/register' , register);

export default router;