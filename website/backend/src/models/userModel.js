import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Name is required"],
        minLength :  [5, "Name Must be atleast 5 character"],
        maxLength :  [50, "Name Must be less than 50 character"],
        trim : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Invalid email"],
    },
    password : {
        type : String,
        required : true,
        minLength : [8, "Password must be atleast 8 characters"]
    },
    questionsSolved : [{
        questionId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Question"
        },
        qId: {
            type : Number,
        },
        timeTaken : {
            type : Number,
            default : 20
        },
        vote: {
            type : Number,
            default : 0
        },
        note: {
            type : String,
            trim : true
        },
        isSolved : {
            type : Boolean,
            default : false
        }
    }],
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
},
{
    timestamps : true
});

const User = mongoose.model("User", userSchema);

export default User;