
const { check } = require('express-validator');
const { validarCampos } = require('../validar-campos');

hospitalCreateValidator = [

    check("nombre", "El nombre del hospital es necesario ").not().isEmpty(),
    validarCampos
]

hospitalUpdateValidator = [

    check("nombre", "El nombre del hospital es necesario ").not().isEmpty(),
    validarCampos
]



module.exports = {

    hospitalCreateValidator,
    hospitalUpdateValidator
}