/* 
    Ruta: '/api/login'
*/


const express = require('express');
const app = express();


const usuarioLoginController = require('../controllers/auth');
const loginValidator = require('../middlewares/validators/login-validator');


app.post('/api/login', loginValidator.loginNormalValidator, usuarioLoginController.login);
app.post('/api/login/google', loginValidator.loginGoogleValidator, usuarioLoginController.google);



module.exports = app;