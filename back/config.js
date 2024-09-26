import dotenv from 'dotenv';

// para armar el __dirname
import path from 'path';

export const __dirname = path.resolve();

// Configurar variables de entorno
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_213';