
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

// Middleware para verificar el token JWT
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //       if (err) return res.sendStatus(403);
    //       req.user = user;
    //       next();
    //     });
};