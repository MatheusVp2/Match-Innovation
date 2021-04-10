// Inportação das Bibliotecas e Modulos
const knex = require('../extensions/database')

// Exporta Middleware de verificação de headers access user
module.exports = async (request, response, next) => {

    // Pega o usuario acessando as rotas
    const usuario = request.headers['x-access-user'];

    // Verifica se tem o usuario no headers e ja retorna o status
    if (!usuario) return response.status(400).json({ status: false, message: 'Nenhum usuario informado.' });
    
    // Verifica se o usuario esta no banco de dados
    const existUser = await knex('usuario').where( { usuario } )

    // Retorna falso se nã encontrar o usuario
    if( existUser.length === 0) return response.status(400).json( { status: false, message: "Usuario não encontrado" } )

    // Adiciona a variavel de requisição
    request.header_usuario = usuario

    // Continua a requisição
    next()
    
}