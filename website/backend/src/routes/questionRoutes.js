import express from 'express';
import { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

const router = express.Router();
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestion);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;