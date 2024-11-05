import mongoose from 'mongoose'
import config from '../config/index.js'

mongoose.set('strictQuery', false);

const connectionToDB = async () => {
    try{
        const {connection} = await mongoose.connect(
            config.databaseURL || 'mongodb://127.0.0.1:27017/ml-backend'
        )
        if(connection){
            console.log(`Connected to ${connection.host} database!!`);
        }
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectionToDB;