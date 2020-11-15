const { Schema, model } = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');


const HospitalSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, "El usuario es necesario"],
        ref: "Usuario"
    }

}, { collection: "hospitales" });


/* 
        MANIPULACION VISTA DE DATOS DESDE MODELO

    HospitalSchema.method('toJSON', function () {

        const { __v, _id, ...object } = this.toObject();
        object.uid = _id

        return object;
    }); 

*/

HospitalSchema.methods.toJSON = function () {

    const { __v, password, ...object } = this.toObject();
    return object;
};

HospitalSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });


module.exports = model("Hospital", HospitalSchema);