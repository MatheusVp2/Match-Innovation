const knex = require('../extensions/database')

module.exports = {
    async like_user (request, response) {

        try {

            // Variavel cotendo usuario "logado" vindo da validação do middleware
            const usuario = request.header_usuario
            const { user } = request.params

            // Busca informações necessarias no banco de dados
            const getUsuario = await knex('usuario').where({ usuario })
            const getLikeUser = await knex('usuario').where({ usuario: user })

            // Verifica se o usuario para dar like existe no banco de dados
            if (getLikeUser.length === 0) return response.status(404).json({ status: false, message: "Usuario like invalido, não encontrado", error: "Usuario like invalido, não encontrado" })

            // Informaçoes necessarias para validação
            const json_usuario = getUsuario[0]
            const json_likeUser = getLikeUser[0]

            const list_like_usuario = JSON.parse(json_usuario.like_users)
            const list_match_usuario = JSON.parse(json_usuario.match_users)

            const list_like_likeUser = JSON.parse(json_likeUser.like_users)
            const list_match_likeUser = JSON.parse(json_likeUser.match_users)
            
            var match = false

            // Verifica se ja tem o like e da o match
            if (list_like_likeUser.indexOf(usuario) != -1) {
                console.log("[INFO] DEU MATCH");

                // Atualizando Matchs Usuario
                list_match_usuario.push(user)
                var match_users = JSON.stringify(list_match_usuario)
                await knex('usuario').update({ match_users }).where({ usuario })

                // Atualizando Matchs LikeUser
                list_match_likeUser.push(usuario)
                var match_likeuser = JSON.stringify(list_match_likeUser)
                await knex('usuario').update({ match_users: match_likeuser }).where({ usuario: user })

                // Setando true respondendo o match na API
                match = true
            }

            // Verificação para evitar likes seguidos
            if (list_like_usuario.indexOf(user) == -1) {
                list_like_usuario.push(user)
                var like_users = JSON.stringify(list_like_usuario)
                await knex('usuario').update({ like_users }).where({ usuario })
            }

            // Retorna a confirmação do like
            return response.status(200).json({ status: true, match, message: "Like realizado com sucesso!" });

        } catch (error) {

            // Caso ocorra algum erro no processo, ira retornar o error
            return response.status(400).json({ status: false, message: "Erro ao realizar o like", error: error.stack });

        }

    },


    async deslike_user (request, response) {
        try {

            // Variavel cotendo usuario "logado" vindo da validação do middleware
            const usuario = request.header_usuario
            const { user } = request.params

            // Busca informações necessarias no banco de dados
            const getUsuario = await knex('usuario').where({ usuario })
            const getDeslikeUser = await knex('usuario').where({ usuario: user })

            // Verifica se o usuario para dar deslike existe no banco de dados
            if (getDeslikeUser.length === 0) return response.status(404).json({ status: false, message: "Usuario like invalido, não encontrado", error: "Usuario like invalido, não encontrado" })

            const json_usuario = getUsuario[0]
            const list_deslike_usuario = JSON.parse(json_usuario.deslike_users)

            // Verificação para evitar likes seguidos
            if (list_deslike_usuario.indexOf(user) == -1) {
                list_deslike_usuario.push(user)
                var deslike_users = JSON.stringify(list_deslike_usuario)
                await knex('usuario').update({ deslike_users }).where({ usuario })
            }

            // Retorna a confirmação do deslike
            return response.status(200).json({ status: true, message: "Deslike realizado com sucesso!" });

        } catch (error) {

            // Caso ocorra algum erro no processo, ira retornar o error
            return response.status(400).json({ status: false, message: "Erro ao realizar o deslike", error: error.stack });

        }

    }
}