import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema = new Schema({
    userName : {
        type : 'String',
        required : [true , "Name is required"],
        minLength :  [5 , "Name Must be atleast 5 character"],
        maxLength :  [50 , "Name Must be less than 5 0character"],
        lowercase : true,
        trim : true
    },
    email : {
        type : 'String',
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        // Taking the regex
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please Fill the valid Email"],

    },
    password : {
        type : 'String',
        required : true,
        minLength : [8 , "password must be atleast 8 character"],
        // Explicitly maange tab hi dena
        select : false,
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,

}, {
    // By default hote rhe
    timestamps : true
});


// Encryption op
// Database mai encrypt karke hi store hogi !!
userSchema.pre('save' ,async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

// Generic model
// Schema level par hi kar de rha hu
userSchema.methods = {
    generateJWTToken : async function(){
        // Steps to generate the jwt tokens
        return await jwt.sign({
            id : this._id,
            email : this.email,
        } , 
        process.env.JWT_TOKEN,
        {
            expiresIn : process.env.JWT_EXPIRY,
        }
    )
    },
    comparePassword : async function (plainTextPassword){
        // Plain text ko database ke password se compare karna hai
        return await bcrypt.compare(plainTextPassword , this.password);
    },
}

// Fr forget password



// Model connection
const User = model("User" , userSchema);

// Export 
export default User;
