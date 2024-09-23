
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config.js';

import { debug } from '../tools/utils.js';

export const checkPermission = (req, res, next) => {
    debug.magenta('Comprobar token a ver si tengo permiso!');
    next();

    // // Get token from header
    // const token = req.header('Authorization')?.replace('Bearer ', '');

    // if (!token) {
    //     return res.status(401).json({ message: 'No token, authorization denied' });
    // }

    // try {
    //     // Verify token
    //     const decoded = jwt.verify(token, JWT_SECRET);

    //     // Add user from payload
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     res.status(401).json({ message: 'Token is not valid' });
    // }
}