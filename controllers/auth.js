const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const { generarJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');




const login = async (req, res = response) => {

    let body = req.body;

    try {


        const usuarioDB = await Usuario.findOne({ email: body.email });

        // Verificar Email
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: "(Usuario) o contraseña incorrectos"
            })
        }

        // Verificar Contraseña
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o (contraseña) incorrecto"
            })
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });



    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}




const google = async (req, res = response) => {

    const googleToken = req.body.token;


    try {

        const googleUser = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email: googleUser.email });


        if (usuarioDB) {

            if (usuarioDB.google === false) {

                return res.status(400).json({
                    ok: false,
                    message: "Debe usar su autenticacion normal"
                });

            } else {

                // Generar el TOKEN - JWT
                const token = await generarJWT(usuarioDB.id);

                return res.json({
                    ok: true,
                    token,
                    menu: getMenuFrontEnd(usuarioDB.role)
                });

            }

        } else {

            //Si el usuario no existe en nuestra base de datos

            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ":)";

            const usuarioDB = await usuario.save();


            // Generar el TOKEN - JWT
            const token = await generarJWT(usuarioDB.id);

            return res.json({
                ok: true,
                token,
                menu: getMenuFrontEnd(usuarioDB.role)
            });

        }


    } catch (error) {

        res.status(401).json({
            ok: false,
            message: "Token no es correcto"
        });

    }





}

const renewToken = async (req, res = response) => {


    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);


    // Obtener el usuario por ID
    const usuarioDB = await Usuario.findById(uid);



    res.json({
        ok: true,
        token,
        usuarioDB,
        menu: getMenuFrontEnd(usuarioDB.role)
    })

}





module.exports = {
    login,
    google,
    renewToken
}