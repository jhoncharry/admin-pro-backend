/* 
    Ruta: '/api/usuarios'
*/

/* 
        MIDDLEWARE UNUSED

    const { check } = require('express-validator');
    const { validarCampos } = require('../middlewares/validar-campos');
*/



const express = require('express');
const app = express();


const usuarioController = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const userValidator = require('../middlewares/validators/user-validator');



app.get('/api/usuarios', validarJWT, usuarioController.getUsuarios);
app.post('/api/usuarios', userValidator.userCreateValidator, usuarioController.crearUsuario);
app.put('/api/usuarios/:id', [validarJWT, validarADMIN_ROLE_o_MismoUsuario, userValidator.userUpdateValidator], usuarioController.actualizarUsuario);
app.delete('/api/usuarios/:id', [validarJWT, validarADMIN_ROLE], usuarioController.borrarUsuario);


module.exports = app;