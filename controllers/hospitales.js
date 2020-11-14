const { response } = require('express');

const Hosptial = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const _ = require("underscore");
const hospital = require('../models/hospital');



const getHospitales = async (req, res = response) => {


    try {
        const findHospitales = await Hosptial.find()
            .populate("usuario", "nombre img");

        res.json({
            ok: true,
            findHospitales
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}



const crearHospital = async (req, res = response) => {

    const id = req.uid

    let body = req.body;
    let hospital = new Hosptial({
        usuario: id,
        ...body
    });





    // Guardar usuario
    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }


}




const actualizarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        message: "actualizarHospital"
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



const borrarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        message: "borrarHospital"
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}