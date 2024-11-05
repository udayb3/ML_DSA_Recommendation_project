import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (userName, email, password) => {
    if(!userName || !password || !email){
        console.log(userName, email, password);
        throw new Error("Enter all the fields");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    if(!user){
        throw new Error("User Not Created");
    }

    await user.save();
    user.password = undefined;
    return user;
}

export const signin = async (email, password) => {
    if(!password || !email){
        throw new Error("Enter all the fields");
    }

    const user = await User.findOne({email})

    const match = await bcrypt.compare(password, user.password);
    if(!user || !match){
        throw new Error("Invalid Credentials");
    }

    user.password = undefined;
    return user;
}