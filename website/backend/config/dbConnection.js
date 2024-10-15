import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

const connectionToDB = async () => {
    try{
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ml-backend'
        )
        // On successful connection
        if(connection){
            console.log("Connection Done" , connection.host);
        }
    }
    catch(e){
        console.log(e);
        // Database hi nhi connect hai toh yahi band kar do
        // Hame questions toh display karni hi hai
        process.exit(1);
    }
    
}

export default connectionToDB;