const { check } = require('express-validator');
const { validarCampos } = require('../validar-campos');

medicoCreateValidator = [

    check("nombre", "El nombre del medico es necesario ").not().isEmpty(),
    check("hospital", "El hospittal id debe ser valido ").isMongoId(),

    validarCampos
]

medicoUpdateValidator = [

    check("nombre", "El nombre del medico es necesario ").not().isEmpty(),
    check("hospital", "El hospittal id debe ser valido ").isMongoId(),

    validarCampos
]



module.exports = {

    medicoCreateValidator,
    medicoUpdateValidator
}