const express = require('express');
const app = express();

const path = require('path');


app.use(require('./usuarios'));
app.use(require('./login'));
app.use(require('./hospitales'));
app.use(require('./medicos'));
app.use(require('./busquedas'));
app.use(require('./uploads'));


// Lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});



module.exports = app;