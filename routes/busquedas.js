/* 
    Ruta:   '/api/todo/:termino'
            '/api/todo/:coleccion/:termino'
*/


const express = require('express');
const app = express();


const busquedaGlobalController = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');




app.get('/api/todo/:termino', validarJWT, busquedaGlobalController.busquedaGlobal);
app.get('/api/todo/:coleccion/:termino', validarJWT, busquedaGlobalController.busquedaColeccion);


module.exports = app;