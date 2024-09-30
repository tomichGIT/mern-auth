// Uso de Multer para upload de archivos
// https://github.com/expressjs/multer/blob/master/doc/README-es.md


import multer from "multer";
import path from "path";

// Opción 1: Datos mínimos, el archivo destino tendrá unun nombre aleatorio y SIN EXTENSION!
//export const upload = multer({ dest: 'public/uploads/' });


// Opción 2: Datos completos, el archivo destino conservará el nombre original o podremos manipularlo
// cb = callback
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