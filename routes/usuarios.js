/* 
    Ruta: '/api/usuarios'
*/


const express = require('express');
const app = express();


const usuarioController = require('../controllers/usuarios');


app.get('/api/usuarios', usuarioController.getUsuarios);
app.post('/api/usuarios', usuarioController.crearUsuario);


module.exports = app;