/* 
    Ruta: '/api/login'
*/


const express = require('express');
const app = express();


const usuarioLoginController = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const loginValidator = require('../middlewares/validators/login-validator');


app.post('/api/login', loginValidator.loginNormalValidator, usuarioLoginController.login);
app.post('/api/login/google', loginValidator.loginGoogleValidator, usuarioLoginController.google);
app.get('/api/login/renew', validarJWT, usuarioLoginController.renewToken);



module.exports = app;