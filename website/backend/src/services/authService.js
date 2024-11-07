import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (username, email, password) => {
    if(!username || !password || !email){
        throw new Error("Enter all the fields");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(!user){
        throw new Error("User Not Created");
    }

    user.password = undefined;
    return user;
}

export const signin = async (email, password) => {
    if(!password || !email){
        throw new Error("Enter all the fields");
    }

    const user = await User.findOne({email})

    if(!user){
        throw new Error("User Not Found");
    }

    const match = await bcrypt.compare(password, user.password);
    if(!user || !match){
        throw new Error("Invalid Credentials");
    }

    user.password = undefined;
    return user;
}