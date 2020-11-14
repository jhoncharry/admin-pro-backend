const express = require('express');
const app = express();


app.use(require('./usuarios'));
app.use(require('./login'));
app.use(require('./hospitales'));
app.use(require('./medicos'));
app.use(require('./busquedas'));
app.use(require('./uploads'));



module.exports = app;