const { response } = require('express');

const Hospital = require('../models/hospital');
const _ = require("underscore");




const getHospitales = async (req, res = response) => {


    try {
        const findHospitales = await Hospital.find()
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

    const uid = req.uid

    let body = _.pick(req.body, ["nombre"]);
    let hospital = new Hospital({
        usuario: uid,
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

    let id = req.params.id;
    let body = _.pick(req.body, ["nombre"]);
    let uid = req.uid;



    // Actualizaciones
    try {

        // Validacion de ID
        const validateHospital = await Hospital.findById(id);

        if (!validateHospital) {
            return res.status(404).json({
                ok: false,
                message: "No existe un hospital con ese Id"
            });
        }


        // Preparar cambios
        const cambiosHospital = {
            ...body,
            usuario: uid
        }


        // Actualizamos datos
        const hospitalDB = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true, runValidators: true, context: "query" });

        res.json({
            ok: true,
            hospital: hospitalDB
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }

}



const borrarHospital = async (req, res = response) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }


    // Actualizaciones
    try {

        // Validacion de ID
        const validateHospital = await Hospital.findById(id);

        if (!validateHospital) {
            return res.status(404).json({
                ok: false,
                message: "No existe un usuario con ese Id"
            });
        }


        // Actualizamos datos
        const hospitalBorrado = await Hospital.findByIdAndUpdate(id, cambiarEstado, { new: true });

        return res.json({
            ok: true,
            message: "Hospital eliminado",
            hospitalBorrado
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });

    }

}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}