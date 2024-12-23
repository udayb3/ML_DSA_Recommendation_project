import express from 'express'
import {login, register, upvote, downvote, solved, addNote , getVoteStatus , getSolvedStatus} from '../controllers/userController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put('/upvote', upvote);
router.put('/downvote', downvote);
router.put('/solved', solved);
router.put('/note', addNote);
router.post('/voteStatus', getVoteStatus);
router.post('/solvedStatus', getSolvedStatus);

export default router;