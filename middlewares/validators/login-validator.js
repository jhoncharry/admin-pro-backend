const { check } = require('express-validator');
const { validarCampos } = require('../validar-campos');

loginNormalValidator = [

    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
]

loginGoogleValidator = [

    check("token", "El token de google es necesario").not().isEmpty(),
    validarCampos
]



module.exports = {
    loginNormalValidator,
    loginGoogleValidator
}