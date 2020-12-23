/* 
    Ruta: '/api/medicos'
*/



const express = require('express');
const app = express();


const medicoController = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const medicoValidator = require('../middlewares/validators/medico-validator');



app.get('/api/medicos', validarJWT, medicoController.getMedicos);
app.post('/api/medicos', [validarJWT, medicoValidator.medicoCreateValidator], medicoController.crearMedico);
app.put('/api/medicos/:id', [validarJWT, medicoValidator.medicoUpdateValidator], medicoController.actualizarMedico);
app.delete('/api/medicos/:id', validarJWT, medicoController.borrarMedico);
app.get('/api/medicos/:id', validarJWT, medicoController.getMedicoById);


module.exports = app;