/* 
    Ruta: '/api/hospitales'
*/



const express = require('express');
const app = express();


const hospitalController = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');
const hospitalValidator = require('../middlewares/validators/hospital-validator');



app.get('/api/hospitales', validarJWT, hospitalController.getHospitales);
app.post('/api/hospitales', [validarJWT, hospitalValidator.hospitalCreateValidator], hospitalController.crearHospital);
app.put('/api/hospitales/:id', /* [validarJWT, userValidator.userUpdateValidator], */ hospitalController.actualizarHospital);
app.delete('/api/hospitales/:id', /* validarJWT, */ hospitalController.borrarHospital);


module.exports = app;