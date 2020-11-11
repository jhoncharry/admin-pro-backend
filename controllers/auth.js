const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    let body = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email: body.email });

        // Verificar Email
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            })
        }

        // Verificar Contraseña
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario o (contraseña) incorrecto"
                }
            })
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token
        });



    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }


}


module.exports = {
    login
}