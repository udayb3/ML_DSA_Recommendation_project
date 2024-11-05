import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js'
import config from './config/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : config.frontedURL,
    credentials : true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/user', userRoutes);
app.use('*', (_, res) => {
    res.status(404).send('OOPS!!, 404 page not found')
})

export default app;