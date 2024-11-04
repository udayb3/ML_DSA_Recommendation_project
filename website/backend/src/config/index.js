import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error){
  throw new Error("Couldn't find .env file");
}

export default{
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGO_URI,
  frontedURL: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
};
