const { Schema, model } = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');


const MedicoSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    img: {
        type: String,
        required: false
    },
    usuario: {
        required: [true, "El usuario es necesario"],
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    hospital: {
        required: [true, "El hospital es necesario"],
        type: Schema.Types.ObjectId,
        ref: "Hospital"
    }

});


/* 
        MANIPULACION VISTA DE DATOS DESDE MODELO

    HospitalSchema.method('toJSON', function () {

        const { __v, _id, ...object } = this.toObject();
        object.uid = _id

        return object;
    }); 

*/

MedicoSchema.methods.toJSON = function () {

    const { __v, password, ...object } = this.toObject();
    return object;
};

MedicoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = model("Medico", MedicoSchema);