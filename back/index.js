import express from 'express';

// import middlewares
import cors from 'cors';

// importo configuraciones
import { __dirname, PORT, DOMAIN } from './config.js';

import { debug } from './tools/utils.js';
import { checkPermission } from './middlewares/auth.js';

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true para parsear arrays y objetos complejos

const MockUser = {
    name: 'tomas',
    username: 'tomas@mail.com',
    image: 'https://picsum.photos/200', // lorem Picsum
};

// Rutas
app.post('/api/v1/login', (req, res) => {
    try {
        const { username, password } = req.body;

        res.status(200).json(MockUser);
    } catch (error) {
    }
});
app.post('/api/v1/register', (req, res) => {

    res.status(200).json(MockUser);

    // // Create and sign JWT
    // const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    // res.status(200).json({ user: { name: user.name, username: user.username, image: user.image }, token });
});
app.get('/api/v1/admin', checkPermission, (req, res) => {
    res.status(200).json(MockUser);

    // // Create and sign JWT
    // const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    // res.status(200).json({ user: { name: user.name, username: user.username, image: user.image }, token });
});

app.listen(PORT, () => {
    debug.bright(`Server is running on ${DOMAIN}:${PORT}`);
});