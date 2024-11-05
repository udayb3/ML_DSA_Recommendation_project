import {signup, signin} from "../services/authService.js";
import {generateToken} from "../utils/jwtUtils.js";

const cookieOptions = {
    maxAge : 3 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}

export const register = async (req, res) => {
    const {userName, email, password} = req.body;

    try{
        const user = await signup(userName, email, password);

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