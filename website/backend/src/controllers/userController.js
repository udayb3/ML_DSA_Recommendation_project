import {signup, signin} from "../services/authService.js";
import * as userService from "../services/userService.js";
import {generateToken} from "../utils/jwtUtils.js";

const cookieOptions = {
    maxAge : 3 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const user = await signup(username, email, password);

        const token = generateToken(user._id);

        res.cookie('token', token, cookieOptions);
        res.status(201).json({
            success : true,
            message : "User registered successfully",
            token,
            user
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await signin(email, password);

        const token = generateToken(user._id);

        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success : true,
            message : "User Logged In successfully",
            token,
            user
        });
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const upvote = async (req, res) => {
    const {username, qId} = req.body;
    try{
        userService.upvote(username, qId);
        res.status(200).json({
            success : true,
            message : "Upvoted successfully",
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const downvote = async (req, res) => {
    const {username, qId} = req.body;
    try{
        userService.downvote(username, qId);
        res.status(200).json({
            success : true,
            message : "Downvoted successfully",
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const solved = async (req, res) => {
    const {username, qId} = req.body;
    try{
        userService.solved(username, qId);
        res.status(200).json({
            success : true,
            message : "Marked solved successfully",
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const addNote = async (req, res) => {
    const {username, qId, note} = req.body;
    try{
        userService.addNote(username, qId, note);
        res.status(200).json({
            success : true,
            message : "Note added successfully",
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const getVoteStatus = async (req, res) => {
    const {username, qId} = req.body;
    try{
        const status = await userService.getVoteStatus(username, qId);
        res.status(200).json({
            success : true,
            status : status
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}

export const getSolvedStatus = async (req, res) => {
    const {username, qId} = req.body;
    try{
        const status = await userService.getSolvedStatus(username, qId);
        res.status(200).json({
            success : true,
            status : status
        });
    }
    catch(e){
        res.status(400).json({
            success : false,
            message : e.message,
        });
    }
}