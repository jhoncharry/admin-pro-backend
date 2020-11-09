const mongoose = require('mongoose');

const dbConnection = () => {

    //Conexion base de datos
    mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log("Base de datos ONLINE"))
        .catch((error) => console.log("Error connecting to MongoDB", error));

    
}


module.exports = {
    dbConnection
};

