// Inportação das Bibliotecas e Modulos
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

// Configurações da Aplicação
app.use(cors());
app.use( express.json() );

// Adicionando Rotas na Aplicação
app.use(routes);

// Configuração de variaveis de ambiente
var server_port = process.env.API_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

// Inicializa a aplicaçao
app.listen( server_port, server_host, function () {
    console.log('Aplicação iniciada na porta', server_port);
});
