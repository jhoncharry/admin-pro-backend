const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const _ = require("underscore");



const getUsuarios = async (req, res = response) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    try {

        /*   

        Codigo que ejecuta de manera secuencial dos promesas (Poco eficiente), luego de este bloque
        de comentarios, se encuentra un metodo eficiente que ejecuta las dos promesas al mismo tiempo
        
        const findUsers = await Usuario.find({ estado: true }, "nombre email role google")
                  .skip(desde)
                  .limit(limite)
                  .exec();
      
              const total = await Usuario.countDocuments(); 
              
         */

        const [findUsers, total] = await Promise.all([
            Usuario.find({ estado: true }, "nombre email role google img")
                .skip(desde)
                .limit(limite)
                .exec(),
            Usuario.countDocuments()
        ]);

        res.json({
            ok: true,
            findUsers,
            total
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}



const crearUsuario = async (req, res = response) => {

    let body = req.body;
    let usuario = new Usuario(body);


    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, 10);


    // Guardar usuario
    try {
        const usuarioDB = await usuario.save();

        // Generar el TOKEN - JWT 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuarioDB,
            token
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}




const actualizarUsuario = async (req, res = response) => {

    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "role"]);

    // Actualizaciones
    try {

        // Validacion de ID
        const validateUser = await Usuario.findById(id);

        if (!validateUser) {
            return res.status(404).json({
                ok: false,
                message: "No existe un usuario con ese Id"
            });
        }


        // Validacion Email
        if (validateUser.email === body.email) {
            delete body.email;
        }


        // Actualizamos datos
        const usuarioDB = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: "query" });

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}



const borrarUsuario = async (req, res = response) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }


    // Actualizaciones
    try {

        // Validacion de ID
        const validateUser = await Usuario.findById(id);

        if (!validateUser) {
            return res.status(404).json({
                ok: false,
                message: "No existe un usuario con ese Id"
            });
        }


        // Actualizamos datos
        const usuarioBorrado = await Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true });

        return res.json({
            ok: true,
            message: "Usuario eliminado",
            usuarioBorrado
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });

    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}