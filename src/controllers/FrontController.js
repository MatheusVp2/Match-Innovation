const knex = require('../extensions/database')

module.exports = {

    async getMatchs (request, response) {

        // Variavel cotendo usuario "logado" vindo da validação do middleware
        const usuario = request.header_usuario

        try {

            // Pega as informaçoes do usuario atua logado
            const getUsuario = await knex('usuario').where({ usuario })

            // Organiza as informaçoes necessarias
            const json_usuario = getUsuario[0]
            lista_match_usuario = JSON.parse(json_usuario.match_users)

            // Busca somente os usuarios com match, ocutando informaçoes de like deslike e matchs
            const getUsersMatch = await knex('usuario')
                .select('id_usuario', 'usuario', 'nome', 'url_foto', 'tipo_usuario', 'classe_interesse', 'descricao')
                .whereIn('usuario', lista_match_usuario)

            // Retorna a responta da api caso ocorra tudo correto
            return response.status(200).json({ status: true, message: "Matchs retornados com sucesso!", data: getUsersMatch })

        } catch (error) {

            // Retorna a responta da api com erro, caso de algum erro, sera tratado no catch e colocado na mensagem de error
            return response.status(400).json({ status: false, message: "Houve algum erro ao retornar os matchs", error })
        }

    },

    async getListUsers (request, response) {

        // Variavel cotendo usuario "logado" vindo da validação do middleware
        const usuario = request.header_usuario

        try {
            // Pega as informaçoes do usuario atua logado
            const getUsuario = await knex('usuario').where({ usuario })

            // Organiza as informaçoes necessarias
            const json_usuario = getUsuario[0]
            var tipo_usuario = json_usuario.tipo_usuario
            lista_like = JSON.parse(json_usuario.like_users)
            lista_deslike = JSON.parse(json_usuario.deslike_users)

            // Cria uma lista dos que ja tiveram interação
            var lista_like_deslike_usuario = lista_like.concat(lista_deslike)
            lista_like_deslike_usuario.push(usuario)

            // Faz busca no banco de dados não listando os que ja tiveram intereção
            var getUsersFiltrados = await knex('usuario')
                .select('id_usuario', 'usuario', 'nome', 'url_foto', 'tipo_usuario', 'classe_interesse', 'descricao')
                .where({ classe_interesse: json_usuario.classe_interesse })
                .whereNot({ tipo_usuario })
                .whereNotIn('usuario', lista_like_deslike_usuario)
                

            // Retorna a responta da api
            return response.status(200).json({ status: true, message: "Usuarios retornados com sucesso!", data: getUsersFiltrados })

        } catch (error) {

            // Retorna a responta da api com erro, caso de algum erro, sera tratado no catch e colocado na mensagem de error
            return response.status(400).json({ status: false, message: "Houve algum erro ao retornar os usuarios", error: error.stack })

        }
    }
}