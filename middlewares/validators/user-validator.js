
const { check } = require('express-validator');
const { validarCampos } = require('../validar-campos');

userCreateValidator = [

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
]

userUpdateValidator = [

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos
]



module.exports = {
    userCreateValidator,
    userUpdateValidator
}