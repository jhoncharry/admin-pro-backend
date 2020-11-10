const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const _ = require("underscore");


const getUsuarios = async (req, res = response) => {

    try {
        const findUsers = await Usuario.find({}, "nombre email role google").exec();

        res.json({
            ok: true,
            findUsers
        });

    } catch (error) {

        return res.status(400).json({
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
    usuario.password = bcrypt.hashSync(usuario.password, salt);


    // Guardar usuario
    try {
        const usuarioDB = await usuario.save();

        res.json({
            ok: true,
            usuarioDB
        });

    } catch (error) {

        return res.status(400).json({
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

        return res.json({
            ok: true,
            usuario: usuarioDB
        });


    } catch (error) {

        return res.status(500).json({
            ok: false,
            error
        });
    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}