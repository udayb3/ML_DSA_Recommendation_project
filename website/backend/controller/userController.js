import User from "../models/userModel.js";
// Abhi cookie ka options
const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}

const register = async (req , res , next) => {
    // Getting the user data from the user
    const {userName , email , password} = req.body;

    if(!userName || !password || !email){
        return res.status(400).json({
            success : false,
            message : "Enter all the fields"
        });
    }

    // Checking inside our database
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            success : false,
            message : "User Already Exist"
        });
    }

    try{
        const user = await User.create({
            userName ,
            email ,
            password
        }) 

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Some error Occured In storing "
            })
        }


        await user.save();
        // store ke baad yaha se password ko hata rha hu
        user.password = undefined;

        const token = await user.generateJWTToken();

        // Generating the JWT Token
        res.cookie('token' , token , cookieOptions);
        res.status(201).json({
            success: true,
            message : "User register successfully",
            user,
        })
    }
    catch(e){
        res.status(400).json({
            success: false,
            message : "Some Error Occured",
            message : e.message,
        })
    }
    
}

export {register}