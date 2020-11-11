/* 
    Ruta: '/api/login'
*/


const express = require('express');
const app = express();


const usuarioLoginController = require('../controllers/auth');


app.post('/api/login', usuarioLoginController.login);



module.exports = app;