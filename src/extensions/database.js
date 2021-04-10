
// Busca arquivo de configuração do banco de dados para o knex
const knexfile = require('../settings/knexfile');

// Inicializa o banco de dados com as configurações setadas
const knex = require('knex')(knexfile.config);

//Exporta o knex para ser usado nas busca das informaçoes do banco de dados como queryBuilder
module.exports = knex