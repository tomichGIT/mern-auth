import express from 'express';

// hash y jwt
import bcrypt from 'bcrypt'; // error de ESM
import jwt from 'jsonwebtoken';

// import middlewares
import cors from 'cors';

// importo configuraciones
import { __dirname, PORT, DOMAIN, JWT_SECRET } from './config.js';

import { debug } from './tools/utils.js';
import { checkPermission, authenticateToken } from './middlewares/auth.js';

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true para parsear arrays y objetos complejos



// Simulando base de datos
const users = [];
const MockUser = {
    name: 'tomas',
    username: 'tomas@mail.com',
    image: 'https://picsum.photos/200', // lorem Picsum
};

// Rutas
app.get('/api/v1/users', async (req, res) => {
    res.status(200).json(users);
});

app.post('/api/v1/login', async (req, res) => {
    // try {
    //      const { username, password } = req.body;
    //      res.status(200).json(MockUser);
    // } catch (error) {
    //      res.status(500).json({ error: 'Error en el servidor' });
    // }

    console.log("haciendo login");

    // uso de bcrypt para el login
    try {
        const { username, password } = req.body;

        console.log("req.body", req.body);

        // Buscar al usuario en la base de datos (simulada)
        const user = users.find((u) => u.username === username);

        console.log("user es: ", user);

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }


        // Creo JWT Token y le devuelvo el Token + Usuario (sin clave)

        // Create and sign JWT
        const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });



        res.status(200).json({ message: 'Login exitoso', data: user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }

});

app.post('/api/v1/register', async (req, res) => {

    // try {
    //      const { username, password } = req.body;
    //      res.status(200).json(MockUser);
    // } catch (error) {
    //      res.status(500).json({ error: 'Error en el servidor' });
    // }

    // Uso de bcrypt para encriptar la contraseña
    try {
        const { username, password, image = "https://picsum.photos/200/300.jpg" } = req.body;

        console.log(req.body);

        // Hashear la contraseña con bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Guardar el usuario en la "base de datos" (array)
        const newUser = { username, password: hashedPassword, image };
        console.log("Hashed password: ", hashedPassword);
        users.push(newUser);
        console.log('Users:', users);


        // Creo JWT Token y le devuelvo el Token + Usuario (sin clave)

        // Create and sign JWT
        const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });

        // res.status(200).json({ user: { name: user.name, username: user.username, image: user.image }, token });


        const user = users.find((u) => u.username === username);

        res.status(201).json({ message: 'Usuario registrado con éxito', token, data: user });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }




});

// RUTA PROTEGIDA v1
// app.get('/api/v1/admin', checkPermission, (req, res) => {
//     res.status(200).json({ message: `Acceso concedido a contenido privado` });
// });

// RUTA PROTEGIDA
app.get('/api/v1/admin', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Acceso concedido a ${req.user.username}` });
});

app.listen(PORT, () => {
    debug.bright(`Server is running on ${DOMAIN}:${PORT}`);
});