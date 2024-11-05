import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import config from '../config/index.js'

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    const token = authorization.replace('Bearer ', '');

    try{
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = await User.findById(payload.userId).select('_id');
        next();
    }
    catch(err){
        return res.status(401).json({ error: 'Not Authorized' });
    }
    
    next();
}

export default requireAuth;