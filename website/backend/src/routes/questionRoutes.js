import express from 'express';
import { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion , getSimilarQuestions, deleteAll } from '../controllers/questionController.js';

const router = express.Router();
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestion);
router.post('/questions', createQuestion);
router.delete('/questions', deleteAll);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);
router.get('/questions/similar/:id', getSimilarQuestions);

export default router;