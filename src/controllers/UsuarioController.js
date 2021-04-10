const knex = require('../extensions/database')

module.exports = {

    async logarUsuario (request, response) {

        try {

            // Pega o usuario passado no json para o login
            var { usuario } = request.body

            // Tenta buscar o usuario no banco de dados
            const existUser = await knex('usuario').where({ usuario })

            // Verifica se o usuario esta na resposta no banco
            if (existUser.length === 0) {
                return response.status(400).json({ status: false, message: "Usuario invalido!", error: "Usuario invalido!" })
            }

            // Caso encontre ele retorna o proprio usuario, retornando suas iformações
            return response.status(200).json({ status: true, message: "Usuario encontrado!", data: existUser })

        } catch (error) {

            // Caso ocorra algum no momento sera tratado e retornado
            return response.status(400).json({ status: true, message: "Houve algum erro de busca do usuario", error: error.stack })

        }

    },

    async cadastrarUsuario (request, response) {

        try {

            // Pega as informaçoes necessarias para o cadastro passados no Json
            var { usuario, nome, url_foto, tipo_usuario, email, email_nit, classe_interesse, descricao } = request.body

            // Tenta buscar o usuario no banco de dados
            const existUser = await knex('usuario').where({ usuario })

            // Verifica se o usuario esta na resposta no banco
            if (existUser.length != 0) {
                return response.status(400).json({ status: false, message: "Usuario ja cadastrado!", error: "Usuario ja cadastrado!" })
            }

            // Insere as informaçoes para o banco de dados, verificando o tipo
            if (tipo_usuario[0].toLowerCase() === "p") {
                var cadUser = await knex('usuario').insert({ usuario, nome, url_foto, tipo_usuario, email, email_nit, classe_interesse, descricao })
            } else {
                var cadUser = await knex('usuario').insert({ usuario, nome, url_foto, tipo_usuario, email, classe_interesse, descricao })
            }

            // Retorna para sucesso, resposta do cadastro que o id do usuario
            return response.status(200).json({ status: true, message: "Usuario cadastrado com sucesso!", data: cadUser })

        } catch (error) {

            // Caso ocorra algum no momento sera tratado e retornado
            return response.status(400).json({ status: false, message: "Erro ao cadastrar ususario", error: error.stack })

        }

    },


    async atualizaUsuario (request, response) {

        try {
            // Variavel cotendo usuario "logado" vindo da validação do middleware
            const usuario = request.header_usuario

            // Pega as informaçoes necessarias para o cadastro passados no Json
            var { nome, url_foto, tipo_usuario, email, email_nit, classe_interesse, descricao } = request.body

            // Insere as informaçoes para o banco de dados, verificando o tipo
            if (tipo_usuario[0].toLowerCase() === "p") {
                var cadUser = await knex('usuario')
                    .update({ nome, url_foto, tipo_usuario, email, email_nit, classe_interesse, descricao })
                    .where({ usuario })
            } else {
                var cadUser = await knex('usuario')
                    .update({ nome, url_foto, tipo_usuario, email, classe_interesse, descricao })
                    .where({ usuario })
            }

            // Retorna para sucesso, resposta do cadastro que o id do usuario
            return response.status(200).json({ status: true, message: "Usuario atualizado com sucesso!", data: cadUser })

        } catch (error) {
            // Caso ocorra algum no momento sera tratado e retornado
            return response.status(400).json({ status: false, message: "Erro ao atualizar usuario", error: error.stack })

        }

    }







}