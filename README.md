# mern-auth
 Auth System con Upload de Archivos

 ## Comprendiendo el problema del Cliente (FrontEnd Primero)

 1. Antes de planificar bases de datos, servidores, vamos a resolver la interacción con el usuario.
 2. Nos centraremos en crear un Layout Básico con las funcionalidades principales, sin preocuparnos por el detras de escena.
 3. Esto nos ayuda a entender mejor las necesidades de nuestros clientes, además de evitar que nos abrumeos con conceptos del backend o base de datos.


## Front

Nuestro Front tendrá formulario de Registro, Login, Home Pública y Sección Privada.

- [ ] Crear Front con Vite-React + React-Router-Dom
- [ ] Alias @ para Vite
- [ ] Instalar TailwindCSS (script cdn + tailwind.config.js)
- [ ] Crear Páginas h1: Registro - Login - Home Público - Home Privado (pages/ <Home><Login><Registro><Admin>)
- [ ] Crear Layout (Header + Main + Footer)
- [ ] Configurar Rutas de React-Router-Dom
- [ ] Mock User (en lib/constants.js) para pruebas
- [ ] Formulario de Login - handleLogin()
- [ ] Formulario de Registro - handleRegistro()
- [ ] Botones de Login + Registro (<Button>)
- [ ] Header condicional si existe user, botón Logout
- [ ] Craemos un contexto utilizando useContext para manejar el estado de autenticación y su hook personalizado hooks/useUser.jsx
- [ ] Simulamos guardar datos de usuario en LocalStorage
- [ ] Proteger ruta privada <PrivateRoute>
- [ ] Botón de Logout y Limpieza de Sesión
- [ ] Crear Variables de entorno para VITE_BACKEND_URL
- [ ] Crear los fetch para Login y Registro

```bash
bun vite create front
bun i react-router-dom
```

## Back

Nuestro Back tendrá una API Rest con rutas para Auth y Usuarios. También poseerá un middleware para proteger rutas privadas.

- [ ] Crear Back con Express y dependencias (cors, nodemon, dotenv, mongoose)
- [ ] Instalar dependencias de Auth (bcryptjs, jsonwebtoken)
- [ ] Dependencias de Auth
- [ ] Crear variables de entorno
- [ ] Archivo de Config.js
- [ ] Conexión a MongoDB Atlas
- [ ] Esquemas de Mongoose para usuarios (nombre, email, contraseña)
- [ ] Crear Rutas de Auth (/registro, /login)
- [ ] Crear una ruta protegida (/admin)
- [ ] Crear middleware auth.js que devuelve true siempre

Día 2: 
- [ ] Ruta de LogOut (?)
- [ ] Hash con Bcrypt
- [ ] JWT con JsonWebToken para protección de rutas privadas
- [ ] Testing

 
```bash
bun init
bun i express mongoose dotenv cors
bun i nodemon --dev
bun i bcryptjs jsonwebtoken
```