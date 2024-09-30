# Multer

Multer es un middleware de Node.js para manejar archivos en formularios multipart/form-data, es decir, para subir archivos al servidor.

[Documentación Multer + Express](https://github.com/expressjs/multer/blob/master/doc/README-es.md)

## Instalación

```bash
npm i multer
```

Creación de un middleware para subir archivos con Multer.

```javascript
// middlewares/multer.js
import multer from "multer";
import path from "path";

// Opción 1: Datos mínimos, el archivo destino tendrá unun nombre aleatorio sin extensión
// export const upload = multer({ dest: 'uploads/' });

// Opción 2: Datos completos, el archivo destino conservará el nombre original o podremos manipularlo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        // V1: utilizando diskStorage para conservar el nombre y extensión original ("Mi Archivo Nu1.png")
        //cb(null, file.originalname);

        // V2: Generando un nombre único + extensión (profile-1630419168109-123456789.jpg)
        // const extension = path.extname(file.originalname); // Obtener la extensión del archivo
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generar nombre único
        // cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`); // ej: "perfil-123456789.jpg"

        // V3: Generando un nombre con Fecha + extensión (profile-2024-09-30T05-55-21-500Z.png)
        const extension = path.extname(file.originalname); // Obtener la extensión del archivo
        //const uniqueSuffix = Date.now(); // fecha unixtimestamp "1630419168109"
        const uniqueSuffix = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-'); // Fecha con formato "2024-09-30T05-52-48-109Z"
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`); // ej: "perfil-2021-08-31-123456789.jpg"
    }
})
export const upload = multer({ storage: storage })
```


## Uso en Express

Crear carpeta `public/uploads` para almacenar los archivos subidos. y un archivo `index.html` con un formulario para probar el upload.

```html
 <!-- public/index.html -->
 <form method="POST" action="./api/v1/upload" enctype="multipart/form-data">

    <h3>Upload de archivos</h3>

    <label for="titulo">Título</label>
    <input type="text" name="titulo" id="titulo" ><br />

    <label for="profile">Imagen</label>
    <input type="file" name="profile" id="profile" /><br />
    
    <input type="submit" value="ENVIAR">
</form>
```

```javascript
// index.js
// Importar el middleware
import { upload } from './middlewares/multer.js';
import { FULL_DOMAIN, __dirname } from './config.js';
import path from 'path';

// servimos archivos estáticos
// app.use('/', express.static('public'));
// app.use('/uploads', express.static('public/uploads'));
// Versión con full path (mas seguro pero mas complejo)
app.use(express.static(path.join(__dirname, "public")));

// Upload de archivos con multer
app.post('/api/v1/upload', upload.single('profile'), (req, res, next) => {
    debug.blue("Subiendo Archivo");
    try {

        console.log("file es ", req.file); // req.file info del archivo
        console.log("body es:", req.body); // otros campos si existieran

        res.status(200).json({
            msg: "Archivo subido correctamente",
            file: req.file,
            body: req.body,
            peso: `${Math.round(req.file.size / 1024)} Kbytes`,
            url: `${FULL_DOMAIN}/uploads/${req.file.filename}`
        });

    } catch (e) {
        debug.red(e);
        next(e);
    }
});
```
