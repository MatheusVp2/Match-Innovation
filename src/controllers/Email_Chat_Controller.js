const knex = require('../extensions/database')
const { v4: uuidv4 } = require('uuid');
const mailer = require('../extensions/mailer')
require('dotenv/config');

module.exports = {

    async enviaEmailNit (request, response) {

        try {

            // Variavel cotendo usuario "logado" vindo da validação do middleware
            const usuario = request.header_usuario

            // Pega as informaçoes passadas para inserer no email padronizado
            var { valor_investimento, user_pesquisador } = request.body

            // Busca algumas informaçoes do usuario
            const getUserPesquisador = await knex('usuario').where({ usuario: user_pesquisador })

            const infoUserPesquisador = getUserPesquisador[0]
            var usuario_pesquisador   = infoUserPesquisador.usuario
            var nome_pesquisador      = infoUserPesquisador.nome
            var email_nit_pesquisador = infoUserPesquisador.email_nit
            var classe_interesse = infoUserPesquisador.classe_interesse

            const classe_ipc = await knex('classe_ipc').where({ codigo: classe_interesse })

            var descricao_classe = classe_ipc[0].descricao

            // Gera um token para possivel liberação do chat
            const token = uuidv4();
            await knex('chat').insert({ usuario, like_usuario: usuario_pesquisador, token })
            
            const host = process.env.API_HOST
            
            // Envia o email padrao 
            mailer.sendMail({
                to: email_nit_pesquisador,
                from: "matheusvp2.projetos@gmail.com",
                subject: "DEU MATCH 😉",
                template : 'match_nit',
                context: { nome_pesquisador, descricao_classe, valor_investimento, token, host }
            }, (err) => {
                if(err) response.status(400).json({ status: false, message: "Houve algum erro ao enviar email!", error: err.stack }); 
                // Retorna a confirmação do email sucesso
                return response.status(200).json({ status: true, message: "Email enviado com sucesso!" });
            
            })

        } catch (error) {
            
            // Se houve algum erro sera tratado e retornado para mais informaçoes
            return response.status(400).json({ status: false, message: "Houve algum erro ao enviar email!", error: error.stack });
        
        }

    },

    async autorizaNit (request, response) {

        try {
            // Pega o token e a resposta
            const { token, resp } = request.params

            // Busca o token informado
            const getTokenInfo = await knex('chat').where({ token })

            // Verifica se o token realmente existe e foi gerado para o chat
            if (getTokenInfo.length === 0) return response.status(400).json({ status: false, message: "Token Invalido!", error: "Token Invalido!" })

            // Atualiza o token para bloquear alterações com a rota
            var new_token = "OK+"+uuidv4()

            // Verifica a resposta padrao, e atualiza liberado para true ou false
            if (resp.toLowerCase() === "sim") {
                await knex('chat').update({ liberado: true, token: new_token}).where({ token })
            } else if ( resp.toLowerCase() === "nao" ){
                await knex('chat').update({ liberado: false, token: new_token}).where({ token })
            }
            
            // Retorna informado se ocorreu tudo certo
            return response.status(200).json({ status: true, message: "Chat com empresario liberado com sucesso!" })
        
        } catch (error) {

            // Se houve algum erro sera tratado e retornado para mais informaçoes
            return response.status(400).json({ status: false, message: "Erro ao liberar o chat!", error: error.stack });
        
        }
    }

}