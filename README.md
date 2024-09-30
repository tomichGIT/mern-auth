# MERN AUTH
Sistema con autenticación y Upload de Archivos

## Comprendiendo el problema del Cliente (FrontEnd Primero)

 1. Antes de planificar bases de datos, servidores, vamos a resolver la interacción con el usuario.
 2. Nos centraremos en crear un Layout Básico con las funcionalidades principales, sin preocuparnos por el detras de escena.
 3. Esto nos ayuda a entender mejor las necesidades de nuestros clientes, además de evitar que nos abrumeos con conceptos del backend o base de datos.


## Front

Nuestro Front tendrá formulario de Registro, Login, Home Pública y Sección Privada.

- [x] Crear Front con Vite-React + React-Router-Dom
- [x] Alias @ para Vite `vite.config.js`
- [x] Instalar TailwindCSS (script cdn + tailwind.config.js)
- [x] Crear Páginas h1: Registro - Login - Home Público - Home Privado (pages/ <Home><Login><Registro><Admin>)
- [x] Crear Layout (Header + Main + Footer)
- [x] Configurar Rutas de React-Router-Dom
- [x] Mock User (en lib/constants.js) para pruebas
- [x] Formulario de Login - handleLogin()
- [x] Formulario de Registro - handleRegistro()
- [-] Botones de Login + Registro (<Button>)
- [x] Header condicional si existe user, botón Logout
- [x] Craemos un contexto utilizando useContext para manejar el estado de autenticación y su hook personalizado `hooks/useUser.jsx`
- [x] Simulamos guardar datos de usuario en LocalStorage
- [x] Proteger ruta privada <PrivateRoute>
- [x] Botón de Logout y Limpieza de Sesión
- [x] Crear Variables de entorno para VITE_BACKEND_URL
- [x] Crear los fetch para Login y Registro
- [ ] Upload de Archivos

```bash
bun create vite front
bun i react-router-dom
```

## Back

Nuestro Back tendrá una API Rest con rutas para Auth y Usuarios. También poseerá un middleware para proteger rutas privadas.

- [x] Crear Back con Express y dependencias (cors, nodemon, dotenv, mongoose)
- [x] Instalar dependencias de Auth (bcrypt, jsonwebtoken)
- [x] Crear variables de entorno
- [x] Archivo de config.js
- [x] Crear Rutas de Auth (/registro, /login, /users)
- [x] Crear una ruta protegida (/admin)
- [x] Hash con Bcrypt
- [x] JWT con JsonWebToken para protección de rutas privadas
- [x] Crear middleware auth.js que devuelve true siempre
- [ ] Esquemas de Mongoose para usuarios (nombre, email, contraseña)
- [ ] Conexión a MongoDB Atlas
- [ ] Testing
- [ ] Upload de Archivos (Multer)


```bash
bun init
bun i express mongoose dotenv cors
bun i nodemon --dev
bun i bcrypt jsonwebtoken
```