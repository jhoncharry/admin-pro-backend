const { Schema, model } = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');


const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]

    },
    email: {
        type: String,
        required: [true, "El correo es necesario"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]

    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"

    },
    google: {
        type: Boolean,
        default: false
    }

});


/* 
        MANIPULACION VISTA DE DATOS DESDE MODELO

    usuarioSchema.method('toJSON', function () {

        const { __v, _id, ...object } = this.toObject();
        object.uid = _id

        console.log(object);
        return object;

    }); 

*/

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
usuarioSchema.path("email").validate((email) => validator.isEmail(email), "Email no valido");

module.exports = model("Usuario", usuarioSchema);