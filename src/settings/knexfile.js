// Configurações do Knex
require('dotenv/config');

module.exports = {
    config: {
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        charset: process.env.DB_CHARSET,
      }
    }
  };
  