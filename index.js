require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');




// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors())


/* 

Ayuda a recibir peticiones del Front-end con el tipado application/x-www-form-urlencoded

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

 */


// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static("public"));




// Configuracion global de rutas
app.use(require('./routes/index'));





app.listen(process.env.PORT, () => {

    console.log("Servidor corriendo en puerto " + process.env.PORT);

});