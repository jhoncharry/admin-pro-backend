/* 
    Ruta: '/api/usuarios'
*/

/* 
        MIDDLEWARE UNUSED

    const { check } = require('express-validator');
    const { validarCampos } = require('../middlewares/validar-campos-unused');
*/





const express = require('express');
const app = express();


const usuarioController = require('../controllers/usuarios');


app.get('/api/usuarios', usuarioController.getUsuarios);
app.post('/api/usuarios', usuarioController.crearUsuario);


module.exports = app;