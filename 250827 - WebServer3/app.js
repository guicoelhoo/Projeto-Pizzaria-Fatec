// importção das libs:
const express = require('express');
const router = require('./index');
const { parse } = require('dotenv');

// configuração geral do projeto
const app = express();
app.use('/', router);


// Exportação:
module.exports = app;