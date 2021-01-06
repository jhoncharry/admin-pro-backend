const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const busquedaGlobal = async (req, res = response) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, "i");


    try {

        const [usuariosDB, medicosDB, hospitalesDB] = await Promise.all([

            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
        ])



        res.json({
            ok: true,
            usuariosDB,
            medicosDB,
            hospitalesDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }

}


const busquedaColeccion = async (req, res = response) => {

    let coleccion = req.params.coleccion
    let termino = req.params.termino;

    let regex = new RegExp(termino, "i");


    let data = [];

    try {

        switch (coleccion) {

            case "medicos":
                data = await Medico.find({ nombre: regex })
                    .populate("usuario", "nombre img")
                    .populate("hospital", "nombre img");
                break;


            case "hospitales":
                data = await Hospital.find({ nombre: regex })
                    .populate("usuario", "nombre img");
                break;


            case "usuarios":
                data = await Usuario.find({ nombre: regex });
                break;


            default:
                return res.status(400).json({
                    ok: false,
                    message: "La tabla tiene que ser usuarios/medicos/hospitales"
                });

        }

        res.json({
            ok: true,
            resultados: data
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }




}


module.exports = {
    busquedaGlobal,
    busquedaColeccion
}