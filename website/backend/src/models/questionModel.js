import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    qId : {
        type : Number,
        required : true,
        unique : true
    },
    totalSolved : {
        type : Number,
        default : 0
    },
    upvotes : {
        type : Number,
        default : 0
    },
    downvotes : {
        type : Number,
        default : 0
    },
    difficulty : {
        type : String,
        trim : true
    },
    tags : [{
        type : String,
        trim : true
    }],
    name : {
        type : String,
        trim : true,
        unique : true,
        required : [true, "Name is required"]
    },
    link : {
        type : String,
        trim : true,
        unique : true,
        required : [true, "Link is required"]
    },
    avgTime : {
        type : Number,
        default : 20
    }
},
{
    timestamps : true
});

const Question = mongoose.model("Question", questionSchema);

export default Question;