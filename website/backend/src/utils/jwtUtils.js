import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateToken = (_id) => {
    return jwt.sign({ _id }, config.jwtSecret,{
        expiresIn: config.jwtExpiry,
    });
}