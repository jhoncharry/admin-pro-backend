const { response } = require('express');

const Medico = require('../models/medico');
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


const getMedicoById = async (req, res = response) => {


    const id = req.params.id;


    try {


        const medico = await Medico.findById(id)
            .populate("usuario", "nombre img")
            .populate("hospital", "nombre img");


            if (!medico) {
                return res.status(404).json({
                    ok: false,
                    message: "No existe un medico con ese Id"
                });
            }


        res.json({
            ok: true,
            medico
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

    let body = _.pick(req.body, ["nombre", "hospital"]);
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

    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "hospital"]);
    let uid = req.uid;



    // Actualizaciones
    try {

        // Validacion de ID
        const validateMedico = await Medico.findById(id);

        if (!validateMedico) {
            return res.status(404).json({
                ok: false,
                message: "No existe un medico con ese Id"
            });
        }


        // Preparar cambios
        const cambiosMedico = {
            ...body,
            usuario: uid
        }


        // Actualizamos datos
        const medicoDB = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true, runValidators: true, context: "query" });

        res.json({
            ok: true,
            medico: medicoDB
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });
    }

}



const borrarMedico = async (req, res = response) => {

    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }


    // Actualizaciones
    try {

        // Validacion de ID
        const validateMedico = await Medico.findById(id);

        if (!validateMedico) {
            return res.status(404).json({
                ok: false,
                message: "No existe un medico con ese Id"
            });
        }


        //Eliminar Medico
        const medicoBorrado = await Medico.findByIdAndDelete(id);

        // Actualizamos datos
        // const medicoBorrado = await Medico.findByIdAndUpdate(id, cambiarEstado, { new: true });

        return res.json({
            ok: true,
            message: "Medico eliminado",
            medicoBorrado
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        });

    }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}