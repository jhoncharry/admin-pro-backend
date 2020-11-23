/* 
    Ruta: '/api/uploads/'
*/


const express = require('express');
const app = express();


const uploadsController = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');


app.use(expressFileUpload());
app.put('/api/upload/:tipo/:id', validarJWT, uploadsController.fileUpload);
app.get('/api/upload/:tipo/:foto', uploadsController.retornaImagen);


module.exports = app;