import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routers/userRoutes.js'

const app = express();
app.use(express.json());


app.use(express.urlencoded({extended : true}))

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}));

// For parsing the jwt tokens
app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/user' , userRoutes);


app.use('*' , (req , res) => {
    res.status(404).send('OOPS !! , 404 page not found')
} )

export default app;