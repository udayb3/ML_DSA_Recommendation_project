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

const login = async (req , res , next) => {
    try{
        const {email , password} = req.body;
        if(!password || !email){
            return res.status(400).json({
                success : false,
                message : "Enter all the fields"
            });
        }

        const user = await User.findOne({
            email
        }).select('+password')

        // Using bcrypt
        if(!user || !user.comparePassword(password)){
            return res.status(400).json({
                success : false,
                message : "Password Doesn't Matched"
            });
        }

        // Token generate karo do then
        const token = await user.generateJWTToken();
        user.password = undefined;

        // Key values op
        res.cookie('token' , token , cookieOptions);

        res.status(200).json({
            success : true,
            message : "User Logged In successfully",
            user,
        })
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Some Error Occured"
        });
    }

}


const dashboard_search = async (req , res , next) => {
    const {question_title} = req.body;

    // Fetching the related recommended question using the ml model
    // Send that filtered questions sets 
}


export {register , login , dashboard_search}