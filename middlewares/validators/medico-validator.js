const { check } = require('express-validator');
const { validarCampos } = require('../validar-campos');

medicoCreateValidator = [

    check("nombre", "El nombre del medico es necesario ").not().isEmpty(),
    check("hospital", "El hospittal id debe ser valido ").isMongoId(),

    validarCampos
]

/* userUpdateValidator = [

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos
]
 */


module.exports = {
    medicoCreateValidator,

}