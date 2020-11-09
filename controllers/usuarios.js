const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const getUsuarios = (req, res) => {


    Usuario.find({}, "nombre email role google")
        .exec((error, usuarios) => {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }


            res.json({
                ok: true,
                usuarios
            });



        });


}




const crearUsuario = (req, res) => {

    let body = req.body;
    let usuario = new Usuario(body);


    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt);


    // Guardar usuario
    usuario.save((error, usuarioDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })


    });



}



module.exports = {
    getUsuarios,
    crearUsuario
}