// Inportação das Bibliotecas e Modulos
const express = require('express')
const routes  = express.Router()

// Importação das Rotas
const AllRouters = require('./routers/AllRouters')

// Agrupa as rotas para inserir no prefixo API VERSAO !
// Podendo separar pastas de API/V1 para ter mais escalabilidade nas versoes da API
myRoutes = [
    AllRouters
];

// Prefixo da Versao da API
routes.use('/api/v1', ...myRoutes)

// Exporta o modulo
module.exports = routes