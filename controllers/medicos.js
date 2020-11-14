const { response } = require('express');

const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const _ = require("underscore");



const getMedicos = async (req, res = response) => {



    try {
        const findMedicos = await Medico.find()
            .populate("usuario", "nombre img")
            .populate("hospital", "nombre img");

        res.json({
            ok: true,
            findMedicos
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}



const crearMedico = async (req, res = response) => {

    const id = req.uid

    let body = req.body;
    let medico = new Medico({
        usuario: id,
        ...body
    });





    // Guardar usuario
    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medicoDB
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}




const actualizarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        message: "actualizarMedico"
    });

    /* let id = req.params.id;
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
 */

}



const borrarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        message: "borrarMedico"
    });

    /* 
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
     */

}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}