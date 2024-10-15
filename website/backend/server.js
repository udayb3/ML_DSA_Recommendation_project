import {config} from 'dotenv';
config();
import app from './app.js';
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000;
// First create account of cloudinary then hame milta hai 
app.listen(PORT , async () => {
    // Dabatase connection kar rhe hai
    await connectionToDB();
    console.log("App is running at port" , PORT);
})