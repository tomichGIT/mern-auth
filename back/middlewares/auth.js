

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

import { debug } from '../tools/utils.js';

// Middleware para verificar el token JWT
export const authenticateToken = (req, res, next) => {

    // dejo pasar cualquier request sin autenticar
    // debug.magenta('Comprobar token a ver si tengo permiso!');
    // next();


    const authHeader = req.headers['authorization'];
    debug.magenta(authHeader);
    // 'Bearer mi-token-jwt-provenieniente-del-front'

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};